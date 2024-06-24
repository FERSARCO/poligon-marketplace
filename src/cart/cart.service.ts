import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from '../cartitem/entities/cartitem.entity';
import { Product } from '../products/entities/product.entity';
import { CreateCartItemDto } from '../cartitem/dto/cartitem.dto';



@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart)private cartRepository: Repository<Cart>,@InjectRepository(CartItem)private cartItemRepository: Repository<CartItem>,@InjectRepository(Product)private productRepository: Repository<Product>,
  ) {}

  async addToCart(createCartItemDto:CreateCartItemDto): Promise<CartItem> {
    const {productId, quantity, userId} = createCartItemDto

    // 3. Encuentra el producto
  const product = await this.productRepository.findOne( {where:{id:productId}});

  if(!product){
    throw new NotFoundException(`Product #${productId} not found`);
  }

  // 1. Encuentra el carrito del usuario
    const cart = await this.cartRepository.findOne({where: { user: { id: userId } },
      relations: ['cartItems', 'cartItems.product'], //  Carga las relaciones para que la consulta sea más eficiente
    });

    console.log(cart);
    // 2. Si no existe el carrito, crea uno nuevo
    if (!cart) {
      const newCart = this.cartRepository.create({ user: { id: userId } });
      await this.cartRepository.save(newCart);
      return this.addToCart(createCartItemDto); // Llama recursivamente al método addToCart
    }

  
    // 4. Verifica si el producto ya está en el carrito
    const existingCartItem = cart.cartItems.find(
      (cartItem) => cartItem.product.id === productId,
    );

    // 5. Si el producto ya está en el carrito, actualiza la cantidad
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      return this.cartItemRepository.save(existingCartItem);
    }

    // 6. Si el producto no está en el carrito, crea un nuevo elemento del carrito
    const newCartItem = this.cartItemRepository.create({cart: cart,product: product,quantity: quantity});

    // 7. Guarda el nuevo elemento del carrito en la base de datos
    return this.cartItemRepository.save(newCartItem);
  }


  async removeFromCart(userId: number, productId: number): Promise<void> {
    // 1. Encuentra el carrito del usuario
  console.log(userId);
  const cart = await this.cartRepository.findOne({where: { user: { id: userId } },
    relations: ['cartItems', 'cartItems.product'], //  Carga las relaciones para que la consulta sea más eficiente
  });
    //  console.log(cart.cartItems);
    // 2. Si el carrito no existe, no hace nada
    if (!cart) {
      return; 
    }
    console.log('paso cart');
    console.log(productId);
    // 3. Encuentra el elemento del carrito que se va a eliminar
    const cartItemToRemove = cart.cartItems.find(
      (cartItem) => cartItem.product.id == productId,
    );

    // 4. Si el elemento del carrito no existe, no hace nada
    if (!cartItemToRemove) {
      return; 
    }

    // 5. Elimina el elemento del carrito de la base de datos
    await this.cartItemRepository.delete(cartItemToRemove.id);
  }

}