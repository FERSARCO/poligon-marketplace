import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CartItem } from '../../cartitem/entities/cartitem.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.carts)
  user: User;

  @OneToMany(() => CartItem, cartItem => cartItem.cart)
  cartItems: CartItem[];

  @ManyToMany(() => Product, product => product.carts)
  @JoinTable() //  Tabla intermedia para la relación ManyToMany
  products: Product[]; 
}

