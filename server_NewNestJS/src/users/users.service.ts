import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { Permission } from "../permissions/permissions.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const userPermission = await this.permissionRepository.find({
      where: { permissionName: "user" },
    });
    const user = await this.usersRepository.save({
      ...userDto,
      permissions: userPermission,
    });

    return user;
  }

  async getUser(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find({ relations: ["permissions"] });
  }

  async addPermission(id, permissionId): Promise<void> {
    const userPermission = await this.permissionRepository.find({
      where: { permissionName: "user" },
    });
    const user = await this.usersRepository.findOne(id);
    if (user) {
    }
  }
}
