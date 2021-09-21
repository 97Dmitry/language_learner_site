import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateUserDto } from "users/dto/create-user.dto";
import { UsersService } from "users/users.service";
import { User } from "./users.model";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 201, type: User })
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: "Get user by ID" })
  @ApiResponse({ status: 200, type: User })
  @Get(":id")
  getUserByID(@Param() params: { id: string }) {
    return this.usersService.getUser(params.id);
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
