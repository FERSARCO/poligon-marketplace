import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateSaleDto } from './dto/sale.dto';
import { Sale } from './entities/sale.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';



@Injectable()
export class SalesService {

  constructor(@InjectRepository(Sale)private readonly saleRepository: Repository<Sale>,@InjectRepository(Product)private productRepository: Repository<Product>,@InjectRepository(User)private userRepository: Repository<User>) {}

  async createSale(createSaleDto: CreateSaleDto):Promise<Sale>{
    const { productId, userId } = createSaleDto;
    // 3. Encuentra el producto
    const product = await this.productRepository.findOne({where: { id: productId }});

    if (!product) {
      throw new NotFoundException(`Product #${productId} not found`);
    }

    // 3. Encuentra el producto
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`Product #${productId} not found`);
    }

    let newSale = new Sale();
    newSale.value = createSaleDto.value;
    newSale.quantity = createSaleDto.quantity;
    newSale.product = product;
    newSale.user = user; 

    this.saleRepository.create(newSale)
    return await this.saleRepository.save(newSale);
  }

  async getSalebyCategoryAndMonth(month: number,category:string) {
 
   const sales = await this.saleRepository.createQueryBuilder('sale')
  .leftJoinAndSelect('sale.product', 'product')
  .where('substring(to_char(sale.saleDate, \'MM\'), 1, 2) = :month', { month: month.toString().padStart(2, '0') }) 
  .andWhere('product.category = :category', { category })
  .getMany();

return sales;
}

}
