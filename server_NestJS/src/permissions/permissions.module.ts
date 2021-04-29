import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { PermissionsService } from "./permissions.service";
import { PermissionsController } from "./permissions.controller";
import { Permission } from "./permissions.model";
import { User } from "../users/users.model";
import { UserPermissions } from "./user-permissions.model";

@Module({
  imports: [SequelizeModule.forFeature([Permission, User, UserPermissions])],
  exports: [PermissionsService],
  providers: [PermissionsService],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
