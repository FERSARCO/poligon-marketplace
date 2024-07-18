import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from '../cartitem/entities/cartitem.entity';
import { Product } from '../products/entities/product.entity';
import { CreateCartItemDto } from '../cartitem/dto/cartitem.dto';
import { NotFoundException } from '@nestjs/common';

describe('CartService', () => {
  let service: CartService;
  let cartRepository: Repository<Cart>;
  let cartItemRepository: Repository<CartItem>;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: getRepositoryToken(Cart),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(CartItem),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    cartRepository = module.get(getRepositoryToken(Cart));
    cartItemRepository = module.get(getRepositoryToken(CartItem));
    productRepository = module.get(getRepositoryToken(Product));
  });

  describe('addToCart', () => {
    it('should add a product to the cart successfully', async () => {
      const createCartItemDto: CreateCartItemDto = {productId: 1,quantity: 2,userId: 1};
      const productMock = { id: 1, name: 'Product 1' };

      jest.spyOn(productRepository, 'findOne').mockResolvedValue(productMock);
      jest.spyOn(cartRepository, 'findOne').mockResolvedValue({
        user: { id: 1,name:'test', email:'tes@gmail' },
        cartItems: [],
      });
      jest.spyOn(cartItemRepository, 'create').mockReturnValue({
        cart: { id: 1 },
        product: { id: 1 },
        quantity: 2,
      });
      jest.spyOn(cartItemRepository, 'save').mockResolvedValue({
        cart: { id: 1 },
        product: { id: 1 },
        quantity: 2,
      });

      const cartItem = await service.addToCart(createCartItemDto);

      expect(cartItem).toEqual({cart: { id: 1 },product: { id: 1 },quantity: 2});
      expect(productRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(cartRepository.findOne).toHaveBeenCalledWith({where: { user: { id: 1 } },relations: ['cartItems', 'cartItems.product']});
      expect(cartItemRepository.create).toHaveBeenCalledWith({cart: { id: 1 },product: { id: 1 },quantity: 2});
      expect(cartItemRepository.save).toHaveBeenCalled();
    });

    it('should throw an error if product is not found', async () => {
      const createCartItemDto: CreateCartItemDto = {productId: 1,quantity: 2,userId: 1};

      jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);

      await expect(service.addToCart(createCartItemDto)).rejects.toThrowError(
        NotFoundException,
      );
      expect(productRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should update existing cart item quantity', async () => {
      const createCartItemDto: CreateCartItemDto = {productId: 1,quantity: 2,userId: 1};
      const productMock = { id: 1, name: 'Product 1' };
      const existingCartItem = {cart: { id: 1 },product: { id: 1 },quantity: 1};

      jest.spyOn(productRepository, 'findOne').mockResolvedValue(productMock);
      jest.spyOn(cartRepository, 'findOne').mockResolvedValue({
        user: { id: 1 },
        cartItems: [existingCartItem],
      });
      jest.spyOn(cartItemRepository, 'save').mockResolvedValue(existingCartItem);

      const cartItem = await service.addToCart(createCartItemDto);

      expect(cartItem).toEqual({cart: { id: 1 },product: { id: 1 },quantity: 3});
      expect(productRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(cartRepository.findOne).toHaveBeenCalledWith({where: { user: { id: 1 } },relations: ['cartItems', 'cartItems.product']});
      expect(cartItemRepository.save).toHaveBeenCalledWith(existingCartItem);
    });
  });
});