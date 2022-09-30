import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ReplLogger } from "@nestjs/core/repl/repl-logger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
