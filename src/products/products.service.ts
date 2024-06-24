import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateProductDto,UpdateProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';


@Injectable()
@ApiTags('products')
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

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
