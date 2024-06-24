import { Controller, Post, Body, UseGuards, Get, Param, Delete, ParseIntPipe, HttpStatus,Res, ValidationPipe, UsePipes } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOkResponse, ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { CartService } from './cart.service';
import { CreateCartItemDto } from '../cartitem/dto/cartitem.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';




@ApiTags('Cart')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  //Add Product To Card
  @ApiOperation({ summary: 'Add product to cart' })
  @ApiCreatedResponse({ description: 'Successfully added product to cart' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @ApiBody({ type: CreateCartItemDto })
  @Post()
  async addProductToCart(@Body() createCartItemDto: CreateCartItemDto, @Res() res: Response) {
    try{
     const cart=  await this.cartService.addToCart(createCartItemDto);
     return res.status(HttpStatus.CREATED).json({ok:true,status:201, message: 'The user has been successfully created.',data:cart})
     }catch(error){
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ok:false,statusCode:500, message:error.message,data:[]});
   }
  }

 


 //Delete Product To Card
  @ApiOperation({ summary: 'Delete product to car' })
  @ApiParam({ name: 'userId', required: true, description: 'ID del usuario' })
  @ApiParam({ name: 'productId', required: true, description: 'ID del producto' })
  @ApiResponse({ status: 204, description: 'Products deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Delete(':userId/product/:productId')
  async removeProductFromCart(@Param('userId') userId: number,@Param('productId') productId: number,@Res() res: Response) {
  try{
      await this.cartService.removeFromCart(userId, productId)
      return res.status(HttpStatus.OK).json({ok:true,status:200, message: 'Products deleted successfully',data:[]})
  }catch(error){
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ok:false,statusCode:500, message:error.message,data:[]});
  }
  }

  //Get detail of cart
  @ApiOperation({ summary: 'Get a detail of cart' })
  @ApiParam({ name: 'id', type: 'number', description: 'Detail' })
  @ApiResponse({ status: 200, description: 'The found detail.' })
  @ApiResponse({ status: 404, description: 'Detail not found.' })
  @ApiOkResponse({ description: 'Successfully retrieved cart items' })
  @Get(':id')
  async getCartItems(@Param('id', ParseIntPipe) id: number,@Res() res: Response) {
    try{
      const cartItems= await this.cartService.getCartDetail(id);
      return res.status(HttpStatus.OK).json({ok:true,status:200, message: 'Successfully retrieved cart items',data:cartItems})
    }catch(error){
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ok:false,statusCode:500, message:error.message,data:[]});
    }
  }
}
