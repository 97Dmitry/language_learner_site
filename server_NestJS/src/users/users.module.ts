import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

import { User } from "./users.model";
import { PermissionsModule } from "permissions/permissions.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), PermissionsModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
