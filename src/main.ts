import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('My Nest.js API') // Título de tu API
    .setDescription('API MARKETPLACE DEMO') // Descripción de tu API
    .setVersion('1.0') // Versión de tu API
    .addTag('MARKETPLACE APIS') // Añade una etiqueta para documentar tu API (opcional)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Configura la ruta para la documentación

  await app.listen(envs.port);
  logger.log(`application running on: ${envs.port}`);
}
bootstrap();