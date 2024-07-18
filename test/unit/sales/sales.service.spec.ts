import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { SalesService } from '../../../src/sales/sales.service';
import { CreateSaleDto } from '../../../src/sales/dto/sale.dto';
import { getRepositoryToken } from '@nestjs/typeorm'; // Importa getRepositoryToken
import { Product } from '../../../src/products/entities/product.entity';
import { User } from '../../../src/users/entities/user.entity';
import { Sale } from '../../../src/sales/entities/sale.entity';
import {mockSale} from './sale.mock'

// Mock de los repositorios
const mockSaleRepository = {create: jest.fn(),save: jest.fn().mockReturnValue(mockSale)};
let mockProductRepository = {findOne: jest.fn().mockReturnValue({ id: 1 })};
const mockUserRepository = {findOne: jest.fn().mockReturnValue({ id: 1 })};

describe('SalesService', () => {
  let service: SalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesService,
        { provide: getRepositoryToken(Sale), useValue: mockSaleRepository },
        { provide: getRepositoryToken(Product), useValue: mockProductRepository },
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();
       service = module.get<SalesService>(SalesService);
  });

  it('should create a new sale', async () => {
    const createSaleDto: CreateSaleDto = {productId: 1,userId: 1,value: 100,quantity: 2};
    const result = await service.createSale(createSaleDto);
    expect(mockProductRepository.findOne).toHaveBeenCalledWith({where: { id: createSaleDto.productId }});
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({where: { id: createSaleDto.userId }});
    expect(mockSaleRepository.create).toHaveBeenCalledWith(expect.objectContaining({value: createSaleDto.value,
        quantity:createSaleDto.quantity,
        product:{id: 1},
        user:{id: 1}}),
    );
    expect(mockSaleRepository.save).toHaveBeenCalledWith(expect.objectContaining({value:createSaleDto.value,
        quantity:createSaleDto.quantity,
        product:{id: 1},
        user:{id: 1}}),
    );
    expect(result).toEqual(mockSale);
  });

  // it('should throw an error if product not found', async () => {
  //   const createSaleDto: CreateSaleDto = {productId: 1,userId: 1,value: 100,quantity: 2};
  //   //mockProductRepository = {findOne: jest.fn()};
  //   (mockProductRepository.findOne).mockReturnValue(null);
  //   await expect(service.createSale(createSaleDto)).rejects.toThrow(NotFoundException);
  //   expect(mockProductRepository.findOne).toHaveBeenCalledWith({ where: { id: createSaleDto.productId } });
  //   expect(mockUserRepository.findOne).not.toHaveBeenCalled();
  //   expect(mockSaleRepository.create).not.toHaveBeenCalled();
  //   expect(mockSaleRepository.save).not.toHaveBeenCalled();
  // });
});