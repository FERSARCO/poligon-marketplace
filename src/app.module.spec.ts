import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module'; // Importa tu módulo principal
import { JwtService } from '@nestjs/jwt'; // Importa JwtService

describe('AppModule', () => {
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule], // Importa tu módulo principal
      providers: [
        {
          provide: JwtService,
          useValue: {}, // Puedes simular un servicio vacío aquí
        },
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });
});