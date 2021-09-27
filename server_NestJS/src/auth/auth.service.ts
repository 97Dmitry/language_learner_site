import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "users/users.model";
import { RegistrationDto } from "./dto/registration.dto";
import * as bcrypt from "bcrypt";
import { PostgresErrorCode } from "database/postgres-error-code";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(userName: string, userPassword: string): Promise<User> {
    const user = await this.usersService.getUserByName(userName);
    if (!user) {
      throw new HttpException("Uncorrect username", HttpStatus.NOT_FOUND);
    }
    await this.verifyPassword(userPassword, user.userPassword);
    return user;
  }

  login(userName: string, userID: number): { access_token: string } {
    const payload = { userName, userID };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registration(
    registrationData: RegistrationDto,
  ): Promise<{ access_token: string }> {
    const hashedPassword = await bcrypt.hash(registrationData.userPassword, 10);
    try {
      const createdUser = await this.usersService.createUser({
        ...registrationData,
        userPassword: hashedPassword,
      });
      return this.login(createdUser.userName, createdUser.userID);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          `User with email: ${registrationData.userEmail} or name: ${registrationData.userName} exists already`,
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtToken(userId: number, userName: string) {
    const payload: TokenPayload = { userId, userName };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      "JWT_EXPIRATION_TIME",
    )}`;
  }
}
