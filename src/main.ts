import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { setupSwagger } from './common/swagger';

async function bootstrap() {
  const looger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // Swagger Configuration
  setupSwagger(app);
  await app.listen(envs.port);
  looger.log(`application running on: ${envs.port}`);
}
bootstrap();
