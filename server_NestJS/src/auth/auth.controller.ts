import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Response } from "express";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegistrationDto } from "./dto/registration.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import RequestWithUser from "./interfaces/requestWithUser.interface";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "Login" })
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  login(
    @Body() loginDto: LoginDto,
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(
      user.userID,
      user.userName,
    );
    response.setHeader("Set-Cookie", cookie);
    // user.password = undefined;
    // return response.send(user);

    return this.authService
      .validateUser(loginDto.userName, loginDto.userPassword)
      .then((data) => this.authService.login(data.userName, data.userID));
  }

  @ApiOperation({ summary: "Registration" })
  @Post("/registration")
  registration(@Body() registrationDto: RegistrationDto) {
    return this.authService.registration(registrationDto);
  }
}
