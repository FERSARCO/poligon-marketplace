import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, product => product.sales)
  product: Product;

  @ManyToOne(() => User, user => user.sales)
  user: User;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  saleDate: Date;
}
