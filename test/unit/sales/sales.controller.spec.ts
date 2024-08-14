import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SalesController } from '../../../src/sales/sales.controller';
import { SalesService } from '../../../src/sales/sales.service';
import { CreateSaleDto } from '../../../src/sales/dto/sale.dto';
import { SaleServiceMock } from './sale.service.mock';
import { mockSale } from './sale.mock';
import { Product } from '../../../src/products/entities/product.entity';
import { User } from '../../../src/users/entities/user.entity';
import { Sale } from '../../../src/sales/entities/sale.entity';

describe('SalesController', () => {
  let controller: SalesController;
  const mockResponse: Partial<Response> = {status: jest.fn().mockReturnThis(),json: jest.fn().mockReturnThis()};

  beforeEach(async () => {
    const saleServiceProvider = {provide: SalesService,useClass: SaleServiceMock};
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [SalesController],
      providers: [SalesService, saleServiceProvider],
    })
      .overrideProvider(SalesService)
      .useClass(SaleServiceMock)
      .compile();
    controller = module.get<SalesController>(SalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new sale', async () => {
    const createSaleDto: CreateSaleDto = {quantity: 2,value: 10,productId: 3,userId: 4};
    await controller.create(createSaleDto, mockResponse as Response);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    expect(mockResponse.json).toHaveBeenCalledWith({
        ok: true,
        status: 201,
        message: 'The sale has been successfully created.',
        data: mockSale,
      });
  });

  it('should throw an error if the product ID is invalid', async () => {
    const createSaleDto: CreateSaleDto = {
      quantity: 2,
      value: 10,
      productId: 999, // Invalid product ID
      userId: 4,
    };

    jest.spyOn(SaleServiceMock.prototype, 'createSale').mockRejectedValue(new NotFoundException(`Product`));

    try {
      await controller.create(createSaleDto, mockResponse as Response);
      fail('Should have thrown an error');
    } catch (error) {
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(mockResponse.json).toHaveBeenCalledWith({
        ok: false,
        status: 404,
        message: 'Product not found',
        data: [],
      });
    }
  });

  it('should throw an error if the user ID is invalid', async () => {
    const createSaleDto: CreateSaleDto = {
      quantity: 2,
      value: 10,
      productId: 999, // Invalid product ID
      userId: 4,
    };

    jest.spyOn(SaleServiceMock.prototype, 'createSale').mockRejectedValue(new NotFoundException(`User`));

    try {
      await controller.create(createSaleDto, mockResponse as Response);
      fail('Should have thrown an error');
    } catch (error) {
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(mockResponse.json).toHaveBeenCalledWith({
        ok: false,
        status: 404,
        message: 'User not found',
        data: [],
      });
    }
  });
});
