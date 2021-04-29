import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "./users.model";
import { Permission } from "../permissions/permissions.model";
import { UserPermissions } from "../permissions/user-permissions.model";
import { PermissionsModule } from "../permissions/permissions.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([User, Permission, UserPermissions]),
    PermissionsModule,
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
