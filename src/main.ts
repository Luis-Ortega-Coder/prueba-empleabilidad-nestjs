import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeDataSource } from './config/conection.config';
import { enviroment } from './config/env.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  enviroment();
  initializeDataSource();
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
