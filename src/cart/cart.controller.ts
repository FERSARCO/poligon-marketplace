import { Controller, Post, Body, UseGuards, Get, Param, Patch, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOkResponse, ApiNotFoundResponse, ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartItemDto,UpdateCartItemDto } from '../cartitem/dto/cartitem.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';



@ApiTags('Cart')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Successfully added product to cart' })
  @ApiBody({ type: CreateCartItemDto })
  async addProductToCart(@Body() createCartItemDto: CreateCartItemDto): Promise<void> {
    await this.cartService.addToCart(createCartItemDto);
  }

  @ApiOperation({ summary: 'Delete product to car' })
  @ApiParam({ name: 'userId', required: true, description: 'ID del usuario' })
  @ApiParam({ name: 'productId', required: true, description: 'ID del producto' })
  @ApiResponse({ status: 204, description: 'Products deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Delete(':userId/product/:productId')
  async removeProductFromCart(@Param('userId') userId: number,@Param('productId') productId: number,) {
    console.log(userId, productId);
    await this.cartService.removeFromCart(userId, productId);
    // ...
  }


  // @Get()
  // @ApiOkResponse({ description: 'Successfully retrieved cart items' })
  // async getCartItems(@GetUser() user: User): Promise<CartItem[]> {
  //   return this.cartService.getCartItems(user);
  // }

  // @Patch(':id')
  // @ApiOkResponse({ description: 'Successfully updated cart item' })
  // @ApiNotFoundResponse({ description: 'Cart item not found' })
  // @ApiBody({ type: UpdateCartItemDto })
  // async updateCartItem(@GetUser() user: User, @Param('id') id: number, @Body() updateCartItemDto: UpdateCartItemDto): Promise<void> {
  //   await this.cartService.updateCartItem(user, id, updateCartItemDto);
  // }

  // @Delete(':id')
  // @ApiOkResponse({ description: 'Successfully removed cart item' })
  // @ApiNotFoundResponse({ description: 'Cart item not found' })
  // async removeCartItem(@GetUser() user: User, @Param('id') id: number): Promise<void> {
  //   await this.cartService.removeCartItem(user, id);
  // }
}
