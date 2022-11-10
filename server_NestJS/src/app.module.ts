import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "auth/auth.module";
import { PermissionsModule } from "permissions/permissions.module";
import { UsersModule } from "users/users.module";

import { TypeOrmConfigService } from "./common/services/typeorm-config.service";
import { validationSchema } from "./config/configuration";
import { WordsModule } from "./words/words.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    PermissionsModule,
    AuthModule,
    WordsModule,
  ],
})
export class AppModule {}
