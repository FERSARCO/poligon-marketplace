import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SalesController } from '../src/sales/sales.controller';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { SalesService } from '../src/sales/sales.service';
import { SaleServiceMock } from './unit/sales/sale.service.mock';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';




describe('SolicitudController (e2e)', () => {
  let app: INestApplication;


  beforeEach(async () => {
    const saleServiceProvider = {provide: SalesService,useClass: SaleServiceMock};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesController],
      providers: [SalesService, saleServiceProvider,JwtService],
    }).overrideGuard(JwtAuthGuard) 
    .useValue('')
    .overrideProvider(SalesService)
      .useClass(SaleServiceMock)
      .compile();
    app = module.createNestApplication();
    await app.init();
  });

  it('/sales (POST)',  () => {
    return request(app.getHttpServer())
      .post('/sales')
      .expect(201);
  });

  it('/sales (GET)', async () => {
    return request(app.getHttpServer())
      .get('/sales/5/category/Home')
      .expect(201);
  });
});