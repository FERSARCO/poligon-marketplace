import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { ProductService } from '../products/products.service';
import { Product } from '../products/entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiBody, ApiParam } from '@nestjs/swagger';


@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOkResponse({ description: 'List of all products' })
  @Get()
  findAll(@Query('category') category?: string): Promise<Product[]> {
    if (category) {
      return this.productService.findByCategory(category); 
    }
    return this.productService.findAll();
  }

  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiOkResponse({ description: 'Product details' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @ApiBody({ type: CreateProductDto })
  @ApiCreatedResponse({ description: 'Product created successfully' })
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  @ApiOkResponse({ description: 'Product updated successfully' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiOkResponse({ description: 'Product deleted successfully' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(id);
  }
}