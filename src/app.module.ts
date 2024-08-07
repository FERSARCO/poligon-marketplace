import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from './cart/cart.module';
import { UsersModule } from './users/users.module';
import { CartitemModule } from './cartitem/cartitem.module';
import { SalesModule } from './sales/sales.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
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
      }),
      inject: [ConfigService],
    }),AuthModule,CartModule,CartitemModule,ProductsModule,SalesModule,UsersModule],
  controllers: [],
  providers: [User],
})
export class AppModule {}
