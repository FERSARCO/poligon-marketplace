import { Sale } from '../../../src/sales/entities/sale.entity';
import { Product } from '../../../src/products/entities/product.entity';
import { User } from '../../../src/users/entities/user.entity';

// Mock de un objeto Sale
export const mockSale: Sale = {
  id: 123,
  quantity: 2,
  value: 19.99,
  saleDate: new Date(),
  product: {id: 456} as Product,
  user: {id: 789} as User,
};