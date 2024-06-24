import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min, IsInt } from 'class-validator';

export class CreateSaleDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({description: 'ID of the product being sold',example: 1})
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({description: 'ID of the user making the purchase',example: 1})
  userId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty({description: 'Quantity of the product being sold',example: 2})
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0) 
  @ApiProperty({description: 'Total value of the sale',example: 19.99})
  value: number;
}

export class UpdateSaleDto extends PartialType(CreateSaleDto) {
  @ApiProperty({description: 'ID of the product being sold (optional for updates)',example: 1})
  productId?: number;

  @ApiProperty({description: 'ID of the user making the purchase (optional for updates)',example: 1})
  userId?: number;

  @IsInt()
  @Min(1)
  @ApiProperty({description: 'Quantity of the product being sold (optional for updates)',example: 3})
  quantity?: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0) 
  @ApiProperty({description: 'Total value of the sale',example: 19.99})
  value: number;
}