import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserEntity } from "users/entities/user.entity";

import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: "userName",
      passwordField: "userPassword",
    });
  }

  async validate(userName: string, userPassword: string): Promise<UserEntity> {
    console.log(userName, userPassword);
    const user = await this.authService.validateUser(userName, userPassword);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
