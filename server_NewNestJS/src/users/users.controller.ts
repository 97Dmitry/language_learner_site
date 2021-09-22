import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateUserDto } from "users/dto/create-user.dto";
import { UsersService } from "users/users.service";
import { User } from "./users.model";
import { AddPermissionDto } from "./dto/add-permission.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 201, type: User })
  @Post()
  createUser(@Body() userDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: "Get user by ID" })
  @ApiResponse({ status: 200, type: User })
  @Get("/:id")
  getUserByID(@Param("id") id: string): Promise<User> {
    return this.usersService.getUser(id);
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "Add permission for User" })
  @ApiResponse({ status: 200, type: User })
  @Post("/add-permission")
  addPermissionForUser(@Body() data: AddPermissionDto): Promise<User> {
    return this.usersService.addPermission(data.userID, data.permissionName);
  }
}
