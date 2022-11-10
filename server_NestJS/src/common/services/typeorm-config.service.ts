import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

import { NODE_ENV } from "../../constants/app.constants";
import { SnakeNamingStrategy } from "../../database/strategies/snake-naming.strategy";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: this.configService.get<string>("POSTGRES_HOST"),
      port: this.configService.get<number>("POSTGRES_PORT"),
      username: this.configService.get<string>("POSTGRES_USER"),
      password: this.configService.get<string>("POSTGRES_PASSWORD"),
      database: this.configService.get<string>("POSTGRES_DB"),
      entities: [__dirname + "../../../**/*.entity{.ts,.js}"],
      namingStrategy: new SnakeNamingStrategy(),
      autoLoadEntities: true,
      synchronize: this.configService.get<string>("NODE_ENV") === NODE_ENV.DEVELOPMENT,
      logging: this.configService.get<string>("NODE_ENV") === NODE_ENV.DEVELOPMENT,
      logger: "advanced-console",
      extra: { charset: "utf8mb4_unicode_ci" },
    };
  }
}
