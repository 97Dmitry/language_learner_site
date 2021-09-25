import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

import { User } from "./users.model";
import { Permission } from "../permissions/permissions.model";

@Module({
  imports: [TypeOrmModule.forFeature([User, Permission])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
