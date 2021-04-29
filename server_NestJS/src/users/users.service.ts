import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { PermissionsService } from "../permissions/permissions.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private permissionService: PermissionsService
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const permissions = await this.permissionService.getPermissionByName("User");
    await user.$set("permissions", [permissions.permission_id]);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }
}
