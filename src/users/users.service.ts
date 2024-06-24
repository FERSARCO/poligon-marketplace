import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@Injectable()
@ApiTags('users')
export class UsersService {
  constructor(@InjectRepository(User)private readonly userRepository: Repository<User>) {}

  @ApiOperation({ summary: 'Create a new user' })
  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await argon2.hash(createUserDto.password);
    const newUser = this.userRepository.create(createUserDto);
    if(!newUser){
      throw new NotFoundException(`Error`);
    }
    return await this.userRepository.save(newUser);
  }

  @ApiOperation({ summary: 'Get all users' })
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  @ApiOperation({ summary: 'Get a single user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }


  @ApiOperation({ summary: 'Get a single user by email' })
  @ApiParam({ name: 'email', type: 'string', description: 'User email' })
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User #${email} not found`);
    }
    return user;
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    // Update the propertys of user with dto data
    Object.assign(user, updateUserDto); 
    return await this.userRepository.save(user);
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User #${id} not found`);
    }
  }
}