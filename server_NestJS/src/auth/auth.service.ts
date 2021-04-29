import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "../users/users.model";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async authorization(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByNameAndEmail(
      userDto.user_name,
      userDto.user_email
    );
    if (candidate) {
      throw new HttpException(
        `User with email: ${userDto.user_email} or name: ${userDto.user_name} exists already`,
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(userDto.user_password, 7);
    const user = await this.userService.createUser({ ...userDto, user_password: hashPassword });

    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = {
      user_id: user.user_id,
      user_name: user.user_name,
      permissions: user.permissions,
    };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByNameAndEmail(
      userDto.user_name,
      userDto.user_email
    );
    const checkPassword = await bcrypt.compare(userDto.user_password, user.user_password);
    if (user && checkPassword) {
      return user;
    }
    throw new UnauthorizedException({ message: "Wrong data" });
  }
}
