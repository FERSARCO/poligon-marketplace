import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsUrl, Min, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({description: 'Name of the product', example: 'Cotton T-Shirt'})
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({description: 'Description of the product',example: 'Soft and comfortable organic cotton t-shirt.'})
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0) 
  @ApiProperty({description: 'Price of the product',example: 19.99})
  price: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({description: 'Category of the product',example: 'T-Shirts'})
  category: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({description: 'URL of the product image',example: 'https://example.com/image.jpg',required: false})
  imageUrl?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({description: 'Available stock of the product',example: 100})
  stock: number;
}
