import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartItem } from 'src/CartItem/entities/cartitem.entity';
import { Product } from './../products/entities/product.entity';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([CartItem,Cart,Product])],
  controllers: [CartController],
  providers: [CartService, JwtService],
})
export class CartModule {}
