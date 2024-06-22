import { Cart } from './../../cart/entities/cart.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../../category/entities/category.entity';


@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[]; 

  @ManyToMany(() => Cart, (cart) => cart.products)
  @JoinTable()
  carts: Cart[]
}