import { CreateSaleDto } from '../../../src/sales/dto/sale.dto';
import { Sale } from '../../../src/sales/entities/sale.entity';
import { Product } from '../../../src/products/entities/product.entity';
import { User } from '../../../src/users/entities/user.entity';

export class SaleServiceMock {
  static getSalebyCategoryAndMonth(getSalebyCategoryAndMonth: any) {
    throw new Error('Method not implemented.');
  }
  static createSale(create: any) {
    throw new Error('Method not implemented.');
  }
  async createSale(createSaleDto: CreateSaleDto): Promise<Sale> {
    return Promise.resolve({
      id: 1,
      quantity: 2,
      value: 10,
      productId: { id: 3 } as Product,
      userId: { id: 4 } as User,
      saleDate: new Date('2024-07-25T00:08:00.233Z'),
    });
  }

  async getSalebyCategoryAndMonth(month: number, category: string): Promise<Sale[]> {
    return Promise.resolve([
      {
        id: 1,
        quantity: 2,
        value: 10,
        productId: { id: 3 } as Product,
        userId: { id: 4 } as User,
        saleDate: new Date('2024-07-25T00:08:00.233Z'),
      },
    ]);
  }
}
