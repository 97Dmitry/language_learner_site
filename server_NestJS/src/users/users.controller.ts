import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { User } from "./users.model";
import { AuthGuard } from "../auth/auth.guard";
import { Permissions } from "../auth/permission-auth.decorator";
import { PermissionGuard } from "../auth/permission.guard";
import { GivePermissionDto } from "./dto/give-permission.dto";
import { BanUserDto } from "./dto/ban-user.dto";

@ApiTags("Users")
@Controller("/users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "User create" })
  @ApiResponse({ status: 200, type: User })
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(AuthGuard)
  @Permissions("Admin")
  @UseGuards(PermissionGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "Give permission for user" })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard)
  @Permissions("Admin")
  @UseGuards(PermissionGuard)
  @Post("/give_permission_for_user")
  givePermissionForUser(@Body() dto: GivePermissionDto) {
    return this.usersService.givePermissionForUser(dto);
  }

  @ApiOperation({ summary: "Give ban for user" })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard)
  @Permissions("Admin")
  @UseGuards(PermissionGuard)
  @Post("/give_ban_for_user")
  giveBanForUser(@Body() dto: BanUserDto) {
    return this.usersService.giveBanForUser(dto);
  }
}
