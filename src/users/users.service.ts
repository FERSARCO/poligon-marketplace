import { Injectable, NotFoundException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { Cart } from '../cart/entities/cart.entity';


@Injectable()
@ApiTags('users')
export class UsersService {
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

 
  //Get a single user by ID
  @ApiOperation({ summary: 'Get a single user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
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
}