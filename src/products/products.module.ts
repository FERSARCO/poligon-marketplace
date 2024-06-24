import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartItem } from 'src/cartitem/entities/cartitem.entity';
import { Product } from './entities/product.entity';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem,Cart,Product,User]),JwtModule], 
  controllers: [ProductsController],
  providers: [ProductsService,AuthService, UsersService],
})
export class ProductsModule {}
