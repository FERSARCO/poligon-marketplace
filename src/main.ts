import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { envs } from './config';



async function bootstrap() {
  const looger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.setGlobalPrefix('api/v1');
  await app.listen(envs.port);
//Swagger documentation
  const config = new DocumentBuilder()
  .setTitle('Mi API de Marketplace')
  .setDescription('Descripción de tu API')
  .setVersion('1.0')
  .addBearerAuth() 
  .build()


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);

  looger.log(`application running on: ${envs.port}`);



}
bootstrap();
