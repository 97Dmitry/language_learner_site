import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PostgresErrorCode } from "database/constraints/postgres-error-code";
import { UserEntity } from "users/entities/user.entity";
import { UsersService } from "users/users.service";

import { RegistrationDto } from "./dto/registration.dto";
import { TokenPayload } from "./interfaces/tokenPayload.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(userName: string, userPassword: string): Promise<UserEntity> {
    try {
      const user = await this.usersService.getUserByName(userName);
      if (!user) {
        throw new HttpException("Uncorrect username", HttpStatus.NOT_FOUND);
      }
      await this.verifyPassword(userPassword, user.userPassword);
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  async registration(registrationData: RegistrationDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(registrationData.userPassword, 7);
    try {
      return await this.usersService.createUser({
        ...registrationData,
        userPassword: hashedPassword,
      });
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
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException("Wrong credentials provided", HttpStatus.BAD_REQUEST);
    }
  }

  public getCookieWithJwtToken(userID: string, userName: string) {
    const payload: TokenPayload = { userID, userName };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      "JWT_EXPIRATION_TIME",
    )}`;
  }

  public getCookieForLogOut() {
    return "Authentication=; HttpOnly; Path=/; Max-Age=0";
  }
}
