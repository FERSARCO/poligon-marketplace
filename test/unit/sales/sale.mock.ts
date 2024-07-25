import { Sale } from '../../../src/sales/entities/sale.entity';
import { Product } from '../../../src/products/entities/product.entity';
import { User } from '../../../src/users/entities/user.entity';

// Mock de un objeto Sale
export const mockSale: Sale = {
  id: 1,
  quantity: 2,
  value: 10,
  saleDate: new Date('2024-07-25T00:08:00.233Z'),
  productId: { id: 3 } as Product,
  userId: { id: 4 } as User,
};
