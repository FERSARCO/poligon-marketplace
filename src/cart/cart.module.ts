import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'

import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from '../cart/entities/cart.entity';
import { CartItem } from '../cartitem/entities/cartitem.entity'
import { Product } from './../products/entities/product.entity';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';


@Module({
  imports: [TypeOrmModule.forFeature([CartItem,Cart,Product, User]),JwtModule],
  controllers: [CartController],
  providers: [CartService,AuthService, UsersService],
})
export class CartModule {}
