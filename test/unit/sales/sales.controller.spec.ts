import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
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
  const mockResponse: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  beforeEach(async () => {
    const saleServiceProvider = {
      provide: SalesService,
      useClass: SaleServiceMock,
    };
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
    // const createSaleDto: CreateSaleDto = {
    //   value: 10,
    //   quantity: 2,
    //   productId: 3,
    //   userId: 4,
    // };

    const expectedResponse = {
      ok: true,
      status: 201,
      message: 'The sale has been successfully created.',
      data: mockSale,
    };

    // Call the function create controller with mockResponse
    const createSaleDto: CreateSaleDto = {
      quantity: 2,
      value: 10,
      productId: 3,
      userId: 4,
    };

    await controller.create(createSaleDto, mockResponse as Response);
    // Validate the controller response
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
  });

  // it('should return 404 if product not found', async () => {
  //   const createSaleDto: CreateSaleDto = {
  //     productId: 1,
  //     userId: 1,
  //     value: 100,
  //     quantity: 2,
  //   };

  //   (mockSalesService.createSale as jest.Mock).mockRejectedValue(new NotFoundException('Product #1 not found'));

  //   const response = await request(app.getHttpServer())
  //     .post('/sales')
  //     .send(createSaleDto)
  //     .expect(HttpStatus.INTERNAL_SERVER_ERROR);

  //   expect(response.body.message).toBe('Product #1 not found');
  // });

  // it('should return 404 if user not found', async () => {
  //   const createSaleDto: CreateSaleDto = {
  //     productId: 1,
  //     userId: 1,
  //     value: 100,
  //     quantity: 2,
  //   };

  //   (mockSalesService.createSale as jest.Mock).mockRejectedValue(new NotFoundException('Product #1 not found'));

  //   const response = await request(app.getHttpServer())
  //     .post('/sales')
  //     .send(createSaleDto)
  //     .expect(HttpStatus.INTERNAL_SERVER_ERROR);

  //   expect(response.body.message).toBe('Product #1 not found');
  // });

  // it('should get sales by category and month', async () => {
  //   const mockSales = [{ id: 1, saleDate: new Date('2023-01-15') }];
  //   (mockSalesService.getSalebyCategoryAndMonth as jest.Mock).mockResolvedValue(mockSales);

  //   const response = await request(app.getHttpServer())
  //     .get('/sales/01/category/Electronics')
  //     .expect(HttpStatus.OK);

  //   expect(response.body.data).toEqual(mockSales);
  //   expect(response.body.message).toBe('Sales');
  //   expect(response.body.ok).toBe(true);
  //   expect(response.body.status).toBe(200);
  //   expect(mockSalesService.getSalebyCategoryAndMonth).toHaveBeenCalledWith(1, 'Electronics');
  // });

  // it('should return 400 if no sales found', async () => {
  //   (mockSalesService.getSalebyCategoryAndMonth as jest.Mock).mockResolvedValue([]);

  //   const response = await request(app.getHttpServer())
  //     .get('/sales/01/category/Electronics')
  //     .expect(HttpStatus.BAD_REQUEST);

  //   expect(response.body.message).toBe('Sales not found.');
  //   expect(response.body.data).toEqual([]);
  //   expect(response.body.ok).toBe(false);
  //   expect(response.body.status).toBe(400);
  //   expect(mockSalesService.getSalebyCategoryAndMonth).toHaveBeenCalledWith(1, 'Electronics');
  // });
});
