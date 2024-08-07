import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/user.entity';
import { Cart } from '../cart/entities/cart.entity';
import { PaginationDto } from 'src/common';
import { UpdateUserDto } from './dto/updateUser.dto';


@Injectable()
@ApiTags('users')
export class UsersService {
  static create(create: any) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectRepository(User)private readonly userRepository: Repository<User>,@InjectRepository(Cart)private readonly cartRepository: Repository<Cart>) {}

  //Create a new user
  @ApiOperation({ summary: 'Create a new user' })
  @ApiParam({ name: 'createUserDto', type: CreateUserDto})
  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await argon2.hash(createUserDto.password);
    const newUser = this.userRepository.create(createUserDto);
    if(!newUser){
      throw new NotFoundException(`Error`);
    }
    const saveUser=await this.userRepository.save(newUser);
    const cart = this.cartRepository.create({ user: saveUser });
    await this.cartRepository.save(cart);
    return saveUser
  }


  //Get all users
  @ApiOperation({ summary: 'Get all users' })
  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPages = await this.userRepository.count();
    const lastPage = Math.ceil(totalPages / limit);
    return {
      data: await this.userRepository.find({
        select: { id:true,name: true, email: true },
        skip: (page - 1) * limit,
        take: limit,

      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      },
    };
 }

 
  //Get a single user by ID
  @ApiOperation({ summary: 'Get a single user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(`User with id # ${id} not found`, HttpStatus.NOT_FOUND);
      //throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

    //Get a single user by email
    @ApiOperation({ summary: 'Get a single user by email' })
    @ApiParam({ name: 'email', type: 'string', description: 'User email' })
    async findOneByEmail(email: string): Promise<User> {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException(`User #${email} not found`);
      }
      return user;
    }

    //Update a single user by ID
    @ApiOperation({ summary: 'Update a single user by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
    @ApiParam({ name: 'updateUserDto', type: 'UpdateUserDto', description: 'update user dto class' })
    async update(id: number, updateUserDto:UpdateUserDto): Promise<User> {
      const { id: _, name,email, } = updateUserDto;
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User #${id} not found`);
      }
      await this.userRepository.update(id, { name,email });
      return user
    }

    //Delete a single user by Id
    @ApiOperation({ summary: 'Delete a single user by Id' })
    @ApiParam({ name: 'id', type: 'number', description: 'User Id' })
    async delete(id: number): Promise<User> {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User #${id} not found`);
      }
      await this.userRepository.delete(id);
      return user
    }

}