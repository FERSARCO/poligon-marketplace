import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

//Swagger documentation
  const config = new DocumentBuilder()
  .setTitle('Mi API de Marketplace')
  .setDescription('Descripción de tu API')
  .setVersion('1.0')
  .addBearerAuth() 
  .build()


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
