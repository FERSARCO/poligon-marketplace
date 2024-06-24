import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateCartItemDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({description: 'ID of the product in the cart',example: 1})
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({description: 'Quantity of the product in the cart',example: 2})
  quantity: number;

  @IsString()
  @IsOptional()
  userId: number;
}

