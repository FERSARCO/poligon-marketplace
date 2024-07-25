import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { CartItem } from '../../cartitem/entities/cartitem.entity';
import { Sale } from '../../sales/entities/sale.entity';
import { Cart } from '../../cart/entities/cart.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  category: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: 0 })
  stock: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @OneToMany(() => Sale, (sale) => sale.productId)
  sales: Sale[];

  @ManyToMany(() => Cart, (cart) => cart.products)
  carts: Cart[];
}
