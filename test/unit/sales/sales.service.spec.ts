import { Test, TestingModule } from '@nestjs/testing';
import { SalesService } from '../../../src/sales/sales.service';
import { CreateSaleDto } from '../../../src/sales/dto/sale.dto';
import { getRepositoryToken } from '@nestjs/typeorm'; // Importa getRepositoryToken
import { Product } from '../../../src/products/entities/product.entity';
import { User } from '../../../src/users/entities/user.entity';
import { Sale } from '../../../src/sales/entities/sale.entity';
import {mockSale} from './sale.mock'

// Mock de los repositorios
const mockSaleRepository = {create: jest.fn(),save: jest.fn().mockReturnValue(mockSale),
    createQueryBuilder: jest.fn().mockReturnValue({
       leftJoinAndSelect: jest.fn().mockReturnThis(),
       where: jest.fn().mockReturnThis(),
       andWhere: jest.fn().mockReturnThis(),
       getMany: jest.fn().mockResolvedValue(mockSale),
     }),};
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new sale', async () => {
    const createSaleDto: CreateSaleDto = {productId: 1,userId: 1,value: 100,quantity: 2};
    const result = await service.createSale(createSaleDto);
    expect(mockProductRepository.findOne).toHaveBeenCalledWith({where: { id: createSaleDto.productId }});
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({where: { id: createSaleDto.userId }});
    expect(mockSaleRepository.create).toHaveBeenCalledWith(expect.objectContaining({value: createSaleDto.value,
        quantity:createSaleDto.quantity,
        productId:{id: 1},
        userId:{id: 1}}),
    );
    expect(mockSaleRepository.save).toHaveBeenCalledWith(expect.objectContaining({value:createSaleDto.value,
        quantity:createSaleDto.quantity,
        productId:{id: 1},
        userId:{id: 1}}),
    );
    expect(result).toEqual(mockSale);
  });

  it('should find sales by month and category', async () => {
    const month = 12;
    const category = 'Electronics';
    const sales = await service.getSalebyCategoryAndMonth(month, category);

    // Verifica que se llame al método createQueryBuilder
    expect(mockSaleRepository.createQueryBuilder).toHaveBeenCalled();

    // Verifica que se llamen los métodos de filtrado
    expect(mockSaleRepository.createQueryBuilder().leftJoinAndSelect).toHaveBeenCalledWith('sale.productId','product');
    expect(mockSaleRepository.createQueryBuilder().where).toHaveBeenCalledWith(
      "substring(to_char(sale.saleDate, 'MM'), 1, 2) = :month",
      { month: month.toString().padStart(2, '0') }
    );
    expect(mockSaleRepository.createQueryBuilder().andWhere).toHaveBeenCalledWith('product.category = :category',{ category });

    // Verifica que se llame al método getMany
    expect(mockSaleRepository.createQueryBuilder().getMany).toHaveBeenCalled();

    // Verifica que se devuelva el resultado esperado
    expect(sales).toEqual(mockSale);
  });
});