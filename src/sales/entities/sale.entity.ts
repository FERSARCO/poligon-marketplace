import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  quantity: number;

  @Column('decimal')
  value: number;

  @CreateDateColumn()
  saleDate: Date;

  @ManyToOne(() => Product, (product) => product.sales)
  productId: Product;

  @ManyToOne(() => User, (user) => user.sales)
  userId: User;
}
