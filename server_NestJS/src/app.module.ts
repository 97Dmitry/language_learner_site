import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

import { UsersModule } from "./users/users.module";
import { User } from "./users/users.model";
import { PermissionsModule } from "./permissions/permissions.module";
import { Permission } from "./permissions/permissions.model";
import { UserPermissions } from "./permissions/user-permissions.model";
import { AuthModule } from "./auth/auth.module";
import { PostsModule } from "./posts/posts.module";
import { Post } from "./posts/posts.model";
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";

import * as path from "path";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({ rootPath: path.join(__dirname, "static") }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB,
      models: [User, Permission, UserPermissions, Post],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    PermissionsModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
