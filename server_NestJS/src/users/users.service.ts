import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PermissionsService } from "permissions/permissions.service";
import { PostgresErrorCode } from "database/postgres-error-code";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private permissionService: PermissionsService,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const userPermission = await this.permissionService.getPermissionsByName(
      "User",
    );
    const user = this.usersRepository.create(userDto);
    user.permissions = [userPermission];
    return await this.usersRepository.save(user);
  }

  async getUserByID(userID: number): Promise<User> {
    const user = await this.usersRepository.findOne(userID, {
      relations: ["permissions"],
    });
    if (user) return user;
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }

  async getUserByName(userName: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { userName: userName },
    });

    if (user) return user;
    throw new HttpException(
      `User with name: ${userName} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find({ relations: ["permissions"] });
  }

  async updateUser(userDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne(userDto.userID);
    if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    try {
      user.userPassword = userDto.userPassword || user.userPassword;
      user.userName = userDto.userName || user.userName;
      user.userEmail = userDto.userEmail || user.userEmail;
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          {
            message: `User with email: ${userDto.userEmail} or name: ${userDto.userName} exists already`,
          },
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        {
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteUser(userID: number): Promise<any> {
    return await this.usersRepository.delete(userID);
  }

  async addPermission(userID: number, permissionName: string): Promise<User> {
    const permission = await this.permissionService.getPermissionsByName(
      permissionName,
    );
    if (!permission)
      throw new HttpException("Permission not found", HttpStatus.NOT_FOUND);

    const user = await this.getUserByID(userID);
    if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    if (user && permission) {
      user.permissions.push(permission);
      return await this.usersRepository.save(user);
    }
  }
}
