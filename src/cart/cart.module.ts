import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartItem } from '../cartitem/entities/cartitem.entity'
import { Product } from './../products/entities/product.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';


@Module({
  imports: [TypeOrmModule.forFeature([CartItem,Cart,Product]),JwtModule],
  controllers: [CartController],
  providers: [CartService, JwtService,AuthService],
})
export class CartModule {}
