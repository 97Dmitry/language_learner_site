import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionsModule } from "permissions/permissions.module";

import { UserEntity } from "./entities/user.entity";
import { UserMetaEntity } from "./entities/userMeta.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserMetaEntity]), PermissionsModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
