import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { initializeDataSource } from './config/conection.config';
import { enviroment, env } from './config/env.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // elimina campos extra
      forbidNonWhitelisted: true, // rechaza payloads basura
      transform: true,            // aplica @Type
      transformOptions: {
      enableImplicitConversion: false,
    },
    stopAtFirstError: true,     // menos CPU
  }),
);
  enviroment();
  await initializeDataSource();
  await app.listen(env.APP_PORT, () => {
    console.log(`Aplicación ejecutándose en el puerto ${env.APP_PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Error al iniciar la aplicación:', err);
  process.exit(1);
});
