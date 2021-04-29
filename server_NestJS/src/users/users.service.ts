import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Op } from "sequelize";
import { InjectModel } from "@nestjs/sequelize";

import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { PermissionsService } from "../permissions/permissions.service";
import { GivePermissionDto } from "./dto/give-permission.dto";
import { BanUserDto } from "./dto/ban-user.dto";

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
    user.permissions = [permissions];
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByNameAndEmail(user_name: string, user_email: string) {
    const user = await this.userRepository.findOne({
      where: {
        [Op.or]: [{ user_name: user_name }, { user_email: user_email }],
      },
      include: { all: true },
    });
    return user;
  }

  async givePermissionForUser(dto: GivePermissionDto) {
    const user = await this.userRepository.findByPk(dto.user_id);
    const permission = await this.permissionService.getPermissionByName(dto.permission);
    if (user && permission) {
      await user.$add("permissions", permission.permission_id);
      return dto;
    } else {
      throw new HttpException("User or Permission not found", HttpStatus.NOT_FOUND);
    }
  }

  async giveBanForUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.user_id);
    if (user) {
      user.banned = true;
      user.ban_reason = dto.ban_reason;
      await user.save();
      return user;
    } else {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
  }
}
