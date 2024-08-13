import { DocumentBuilder, SwaggerModule  } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const setupSwagger = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('My Nest.js API')
    .setDescription('API MARKETPLACE DEMO')
    .setVersion('1.0')
    .addTag('MARKETPLACE APIS')
    .addBearerAuth()
    .addServer('/dev') 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);
};
