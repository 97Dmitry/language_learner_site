import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

//MODULES
import { UsersModule } from "users/users.module";
import { PermissionsModule } from "permissions/permissions.module";
// MODELS
import { User } from "users/users.model";
import { Permission } from "permissions/permissions.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB,
      entities: [User, Permission],
      synchronize: true,
      logging: true,
      logger: "advanced-console",
    }),
    UsersModule,
    PermissionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
