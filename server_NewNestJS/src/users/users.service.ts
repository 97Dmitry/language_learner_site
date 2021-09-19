import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save({ ...userDto });
  }

  async getUser(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }
}
