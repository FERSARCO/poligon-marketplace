import { Injectable, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

@Injectable()
export class SwaggerConfig implements NestModule {
  constructor(private configService: ConfigService) { }

 async configure(consumer: MiddlewareConsumer) {
    const expressApp = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    const options = new DocumentBuilder()
      .setTitle(this.configService.get<string>('APP_NAME'))
      .setDescription(this.configService.get<string>('APP_DESCRIPTION'))
      .setVersion(this.configService.get<string>('APP_VERSION'))
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    const server = createServer(expressApp);
    // Configura proxy para manejar las peticiones de API Gateway
    proxy(server, eventContext(), 'PROMISE').promise;
  }
}

function express() {
    throw new Error('Function not implemented.');
}
