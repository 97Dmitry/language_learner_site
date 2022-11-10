import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostgresErrorCode } from "database/constraints/postgres-error-code";
import { PermissionsService } from "permissions/permissions.service";
import { Repository } from "typeorm";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { UserMetaEntity } from "./entities/userMeta.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    @InjectRepository(UserMetaEntity) private userMetaRepository: Repository<UserMetaEntity>,
    private permissionService: PermissionsService,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    try {
      const userPermission = await this.permissionService.getPermissionsByName("User");
      const userMeat = await this.createUserMetadata();
      const user = this.usersRepository.create(userDto);
      user.permissions = [userPermission];
      user.meta = userMeat;
      return await this.usersRepository.save(user);
    } catch (e) {
      console.log(e);
    }
  }

  async createUserMetadata(): Promise<UserMetaEntity> {
    try {
      const meat = this.userMetaRepository.create();
      return await this.userMetaRepository.save(meat);
    } catch (e) {
      console.log(e);
    }
  }

  async getUserByID(userID: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { userID },
      relations: ["permissions"],
    });
    if (user) return user;
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }

  async getUserByName(userName: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { userName: userName },
      relations: ["permissions"],
    });

    if (user) return user;
    throw new HttpException(`User with name: ${userName} not found`, HttpStatus.NOT_FOUND);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.find({ relations: ["permissions", "meta"] });
  }

  async updateUser(userDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ userID: userDto.userID });
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

  async addPermission(userID: string, permissionName: string): Promise<UserEntity> {
    const permission = await this.permissionService.getPermissionsByName(permissionName);
    if (!permission) throw new HttpException("Permission not found", HttpStatus.NOT_FOUND);

    const user = await this.getUserByID(userID);
    if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    if (user && permission) {
      user.permissions.push(permission);
      return await this.usersRepository.save(user);
    }
  }
}
