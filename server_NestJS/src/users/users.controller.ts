import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateUserDto } from "users/dto/create-user.dto";
import { UsersService } from "users/users.service";
import { User } from "./users.model";
import { AddPermissionDto } from "./dto/add-permission.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DeleteUserDto } from "../../../server_NestJS/src/users/dto/delete-user.dto";

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
  getUserByID(@Param("id") userID: string): Promise<User> {
    return this.usersService.getUser(userID);
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "Update user" })
  @ApiResponse({ status: 200, type: [User] })
  @Post("/update")
  updateUser(@Body() userDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(userDto).catch((err) => {
      if (err.routine === "_bt_check_unique") {
        throw new HttpException(
          {
            message: err.detail,
          },
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @ApiOperation({ summary: "Delete user" })
  @ApiResponse({ status: 201 })
  @Delete()
  deleteUserByID(@Body() userDto: DeleteUserDto): Promise<any> {
    return this.usersService.deleteUser(userDto.userID);
  }

  @ApiOperation({ summary: "Add permission for User" })
  @ApiResponse({ status: 200, type: User })
  @Post("/add-permission")
  addPermissionForUser(@Body() data: AddPermissionDto): Promise<User> {
    return this.usersService.addPermission(data.userID, data.permissionName);
  }
}
