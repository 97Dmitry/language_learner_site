import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "./users.model";
import { Permission } from "../permissions/permissions.model";
import { UserPermissions } from "../permissions/user-permissions.model";
import { PermissionsModule } from "../permissions/permissions.module";

@Module({
  imports: [SequelizeModule.forFeature([User, Permission, UserPermissions]), PermissionsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
