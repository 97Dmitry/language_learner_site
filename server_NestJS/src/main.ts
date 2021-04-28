import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function start() {
  const PORT = process.env.PORT || 7000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Server for site's Language Learner")
    .setDescription("REST API Documentation")
    .setVersion("0.0.2")
    .addTag("Language Learner")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT, () => {
    console.log(`Started on ${PORT}`);
  });
}
start();
