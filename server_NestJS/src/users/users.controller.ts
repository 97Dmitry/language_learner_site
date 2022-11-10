import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "users/dto/create-user.dto";
import { UsersService } from "users/users.service";

import { AddPermissionDto } from "./dto/add-permission.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [UserEntity] })
  @Get()
  getAllUsers(): Promise<UserEntity[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 201, type: UserEntity })
  @Post()
  createUser(@Body() userDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: "Get user by ID" })
  @ApiResponse({ status: 200, type: UserEntity })
  @Get("/:id")
  getUserByID(@Param("id") userID: string): Promise<UserEntity> {
    return this.usersService.getUserByID(userID);
  }

  @ApiOperation({ summary: "Update user" })
  @ApiResponse({ status: 200, type: [UserEntity] })
  @Put()
  updateUser(@Body() userDto: UpdateUserDto): Promise<UserEntity> {
    return this.usersService.updateUser(userDto);
  }

  @ApiOperation({ summary: "Delete user" })
  @ApiResponse({ status: 201 })
  @Delete()
  deleteUserByID(@Body() userDto: DeleteUserDto): Promise<any> {
    return this.usersService.deleteUser(userDto.userID);
  }

  @ApiOperation({ summary: "Add permission for User" })
  @ApiResponse({ status: 200, type: UserEntity })
  @Post("/add-permission")
  addPermissionForUser(@Body() data: AddPermissionDto): Promise<UserEntity> {
    return this.usersService.addPermission(data.userID, data.permissionName);
  }
}
