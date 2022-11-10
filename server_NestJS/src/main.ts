import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

const useSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle("Language Learner Site")
    .setDescription("The LLS API description")
    .setVersion("0.1.0")
    .addTag("LLS")
    .addCookieAuth("Authentication")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
};

async function bootstrap() {
  const PORT = process.env.PORT || 6001;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.use(cookieParser());

  useSwagger(app);

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}

bootstrap();
