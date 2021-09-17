import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB,
      entities: ["dist/db/entity/**/*.js"],
      synchronize: true,
      logging: true,
      logger: "advanced-console",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
