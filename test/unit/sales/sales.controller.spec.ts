
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm'; // Importa getRepositoryToken
import { SalesController } from '../../../src/sales/sales.controller';
import { SalesService } from '../../../src/sales/sales.service';
import { CreateSaleDto } from '../../../src/sales/dto/sale.dto';
import { Sale } from '../../../src/sales/entities/sale.entity';
import { Product } from '../../../src/products/entities/product.entity';
import { User } from '../../../src/users/entities/user.entity';
import { mockSale } from './sale.mock';
import { JwtModule } from '@nestjs/jwt';

describe('SalesController', () => {
  let app: INestApplication;
  let mockSalesService: SalesService;
  let mockSaleController: SalesController;
// Mock de los repositorios
const mockSaleRepository = {create: jest.fn(),save: jest.fn().mockReturnValue(mockSale)};
let mockProductRepository = {findOne: jest.fn().mockReturnValue({ id: 1 })};
const mockUserRepository = {findOne: jest.fn().mockReturnValue({ id: 1 })};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[JwtModule],
      controllers: [SalesController],
      providers: [SalesService,
      { provide: getRepositoryToken(Sale), useValue: mockSaleRepository },
      { provide: getRepositoryToken(Product), useValue: mockProductRepository },
      { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    mockSaleController= module.get<SalesController>(SalesController);
    mockSalesService = module.get<SalesService>(SalesService);
  });

  it('should create a new sale', async () => {
    const createSaleDto: CreateSaleDto = {productId: 1,userId: 1,value: 100,quantity: 2};
    
    const response: any = await request(app.getHttpServer())
      .post('/sales')
      .send(createSaleDto)
      .expect(HttpStatus.CREATED);

    expect(response.body.data).toEqual(mockSale);
    expect(response.body.message).toBe('The sale has been successfully created.');
    expect(response.body.ok).toBe(true);
    expect(response.body.status).toBe(201);
    expect(mockSalesService.createSale).toHaveBeenCalledWith(createSaleDto);
    expect(mockSaleController.create(createSaleDto,response)).toEqual(response.body);
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