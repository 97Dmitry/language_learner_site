import { Body, Controller, HttpCode, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request } from "express";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegistrationDto } from "./dto/registration.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import RequestWithUser from "./interfaces/requestWithUser.interface";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: "Authorization and return user" })
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Body() loginDto: LoginDto, @Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.userID, user.userName);
    request.res.setHeader("Set-Cookie", cookie);
    return user;
  }

  @ApiOperation({ summary: "Registration" })
  @Post("/registration")
  async registration(@Body() registrationDto: RegistrationDto, @Req() request: Request) {
    const user = await this.authService.registration(registrationDto);
    const cookie = this.authService.getCookieWithJwtToken(user.userID, user.userName);
    request.res.setHeader("Set-Cookie", cookie);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @Post("logout")
  async logOut(@Req() request: RequestWithUser) {
    request.res.setHeader("Set-Cookie", this.authService.getCookieForLogOut());
  }
}
