import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { PaginationDto } from 'src/common';


@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

  //Create a new product
  @ApiOperation({ summary: 'Create a new product' })
  @ApiParam({ name: 'createProductDto', type: CreateProductDto})
  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  //Get all products
  @ApiOperation({ summary: 'Get all products' })
  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPages = await this.productRepository.count();
    const lastPage = Math.ceil(totalPages / limit);
    return {
      data: await this.productRepository.find({
        select: { id:true,name: true, imageUrl: true },
        skip: (page - 1) * limit,
        take: limit,

      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      },
    };
 }

  //Get all products by name
  @ApiOperation({ summary: 'Get all products by name' })
  @ApiParam({ name: 'name', type: 'string', description: 'Product name' })
  async findAllByName(name: string): Promise<Product[]> {
    return await this.productRepository.find({where: { name: Like(`%${name}%`) },select: { name: true, imageUrl: true }, })
  }


   //Get a single product by id
  @ApiOperation({ summary: 'Get a single product by id' })
  @ApiParam({ name: 'id', type: 'number', description: 'Product ID' })
  async findOneById(id: number): Promise<Product> {
    return await this.productRepository.findOne({ where: { id } });
  }


}
