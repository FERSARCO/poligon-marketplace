import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from '../cartitem/entities/cartitem.entity';
import { Product } from '../products/entities/product.entity';
import { CreateCartItemDto } from '../cartitem/dto/cartitem.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';



@Injectable()
export class CartService {
  cartItem: CartItem[];
  constructor(@InjectRepository(Cart)private cartRepository: Repository<Cart>,@InjectRepository(CartItem)private cartItemRepository: Repository<CartItem>,@InjectRepository(Product)private productRepository: Repository<Product>,
  ) {}

  //Add product to cart
  @ApiOperation({ summary: 'Add product to cart' })
  @ApiParam({ name: 'createCartItemDto', type: CreateCartItemDto})
  async addToCart(createCartItemDto:CreateCartItemDto): Promise<CartItem> {
    const {productId, quantity, userId} = createCartItemDto

   //Find product
  const product = await this.productRepository.findOne( {where:{id:productId}});

  if(!product){
    throw new NotFoundException(`Product #${productId} not found`);
  }

   //Find Cart
    const cart = await this.cartRepository.findOne({where: { user: { id: userId } },
      relations: ['cartItems', 'cartItems.product'],
    });

    if (!cart) {
      const newCart = this.cartRepository.create({ user: { id: userId } });
      await this.cartRepository.save(newCart);
      return this.addToCart(createCartItemDto);
    }

    // Find CartItem
    const existingCartItem = cart.cartItems.find(
      (cartItem) => cartItem.product.id === productId,
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      return this.cartItemRepository.save(existingCartItem);
    }

    const newCartItem = this.cartItemRepository.create({cart: cart,product: product,quantity: quantity});
    return this.cartItemRepository.save(newCartItem);
  }

  //Remove product to cart
  @ApiOperation({ summary: 'Remove product from cart' })
  @ApiParam({ name: 'userId', type: 'number'})
  @ApiParam({ name: 'productId', type: 'number'})
  async removeFromCart(userId: number, productId: number): Promise<void> {
  //Find cart
  const cart = await this.cartRepository.findOne({where: { user: { id: userId } },
    relations: ['cartItems', 'cartItems.product'],
  });

    if (!cart) {return}

    // Find cartItemRemove
    const cartItemToRemove = cart.cartItems.find(
      (cartItem) => cartItem.product.id == productId,
    );

    if (!cartItemToRemove) {return}
    await this.cartItemRepository.delete(cartItemToRemove.id);
  }

  async getCartDetail(id:number): Promise<CartItem[]> {
  const cart = await this.cartRepository.findOne({where: {  id: id  },relations: ['cartItems', 'cartItems.product']});
  this.cartItem= cart.cartItems
  return  this.cartItem
}
}