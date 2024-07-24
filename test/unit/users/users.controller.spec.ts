import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../../src/users/users.controller';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { mockUser } from './user.mock';
import { UserServiceMock } from './user.service.mock';
import { UsersService } from '../../../src/users/users.service';
import { CreateUserDto } from '../../../src/users/dto/user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  const mockResponse: Partial<Response> = {status: jest.fn().mockReturnThis(),json: jest.fn().mockReturnThis()};

  beforeEach(async () => {
    const UserServiceProvider = { provide: UsersService, useClass: UserServiceMock };
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [UsersController],
      providers: [UsersService, UserServiceProvider],
    })
    .overrideProvider(UsersService)
    .useClass(UserServiceMock)
    .compile();
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {name: 'John Doe',email: 'john.doe@example.com',password: 'password'};
    const expectedResponse = { ok: true,status: 201,message: 'The user has been successfully created.',data: mockUser};
    // Call the function create controller with mockResponse
    await controller.create(createUserDto, mockResponse as Response);
    // Validate the controller response
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
  });
});
