import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PermissionsService } from "permissions/permissions.service";

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
    const user = new User();
    user.userEmail = userDto.userEmail;
    user.userName = userDto.userName;
    user.userPassword = userDto.userPassword;
    user.permissions = [userPermission];
    return await this.usersRepository.save(user);
  }

  async getUser(userID: number): Promise<User> {
    const user = await this.usersRepository.findOne(userID, {
      relations: ["permissions"],
    });
    if (user) return user;
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find({ relations: ["permissions"] });
  }

  async updateUser(userDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne(userDto.userID);
    if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    user.userPassword = userDto.userPassword || user.userPassword;
    user.userName = userDto.userName || user.userName;
    user.userEmail = userDto.userEmail || user.userEmail;
    return await this.usersRepository.save(user);
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

    const user = await this.getUser(userID);
    if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    if (user && permission) {
      user.permissions.push(permission);
      return await this.usersRepository.save(user);
    }
  }
}
