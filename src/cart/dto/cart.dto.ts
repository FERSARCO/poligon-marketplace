import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { CartItem } from '../../cartitem/entities/cartitem.entity';
import { Type } from 'class-transformer'; 
import { CreateCartItemDto } from './../../cartitem/dto/cartitem.dto';

export class CreateCartDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'User ID who owns the cart', example: 1 })
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCartItemDto)
  @ApiProperty({ description: 'Array of cart items', type: CreateCartItemDto, isArray: true, example: [{ productId: 1, quantity: 2 }, { productId: 3, quantity: 1 }]})
  cartItems: CartItem[];
}

