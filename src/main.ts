import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeDataSource } from './config/conection.config';
import { enviroment, env } from './config/env.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
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
