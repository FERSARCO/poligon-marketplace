import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, ProductsModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PG_HOST'),
        port: configService.get('PG_PORT'),
        username: configService.get('PG_USER'),
        password: configService.get('PG_PASS'),
        database: configService.get('PG_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        ssl: false,
        autoLoadEntities: true,
        // synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CategoryModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
