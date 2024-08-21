import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from '../../../src/users/users.controller';
import { mockUser } from './user.mock';
import { UserServiceMock } from './user.service.mock';
import { UsersService } from '../../../src/users/users.service';
import { CreateUserDto } from '../../../src/users/dto/createUser.dto';
import { PaginationDto } from '../../../src/common';

describe('UsersController', () => {
  let controller: UsersController;
  const mockResponse: Partial<Response> = {status: jest.fn().mockReturnThis(),json: jest.fn().mockReturnThis()};

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [UsersController],
      providers: [UsersService],
    }).overrideProvider(UsersService)
      .useClass(UserServiceMock)
      .compile();
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'SecurePassword123',
    };

    await controller.createUser(createUserDto, mockResponse as Response);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: true,
      status: 201,
      message: 'The user has been successfully created.',
      data: mockUser,
    });
  });

  it('should throw an error if the email exist', async() =>{
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'SecurePassword123',
    };

    jest.spyOn(UserServiceMock.prototype, 'create').mockRejectedValue(new NotFoundException(`Email Exist`));

    try {
      await controller.createUser(createUserDto, mockResponse as Response);
      fail('Should have thrown an error');
    } catch (error) {
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith({
        ok: false,
        status: 400,
        message: 'The email is already registere',
        data: [],
      });
    }
  })

  it('should return all users', async()=>{

    const paginationDto: PaginationDto = {"limit": 1,"page": 5}
    const mockUsers = [mockUser, mockUser];
    // jest.spyOn(UserServiceMock.prototype, 'findAll').mockResolvedValue(mockUsers)
    await controller.findAllUsers(paginationDto, mockResponse as Response);
    // expect(UserServiceMock.prototype.findAll).toHaveBeenCalledWith(paginationDto);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: true,
      status: 200,
      message: 'List of all users',
      data: { "data": mockUsers ,
    "meta": {
      "total": 5,
      "page": "1",
      "lastPage": 1
    }
  },
    });
  })
});
