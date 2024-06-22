import { IsString, IsNumber } from 'class-validator';
import { ApiProperty,PickType } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Name of the product', example: 'Laptop' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the product', example: 'Powerful gaming laptop with RTX 3080' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Price of the product', example: 1500 })
  @IsNumber()
  price: number;
}

export class UpdateProductDto extends PickType(CreateProductDto, [
  'name',
  'description',
  'price',
] as const) {}
