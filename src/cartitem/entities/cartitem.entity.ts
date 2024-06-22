import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, cart => cart.cartItems)
  cart: Cart;

  @ManyToOne(() => Product, product => product.cartItems)
  product: Product;

  @Column('int')
  quantity: number;
}