import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';


@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

  @ApiOperation({ summary: 'Create a new product' })
  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  @ApiOperation({ summary: 'Get all products' })
  async findAll() {
    return await this.productRepository.find({
      select: { name: true, imageUrl: true },
    });
  }

  @ApiOperation({ summary: 'Get all products by name' })
  @ApiParam({ name: 'name', type: 'string', description: 'Product name' })
  async findAllByName(name: string): Promise<Product[]> {
    return await this.productRepository.find({where: { name: Like(`%${name}%`) },select: { name: true, imageUrl: true }, })
  }

  @ApiOperation({ summary: 'Get a single product by id' })
  @ApiParam({ name: 'id', type: 'number', description: 'Product ID' })
  async findOneById(id: number): Promise<Product> {
    return await this.productRepository.findOne({ where: { id } });
  }


}
