import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@Injectable()
@ApiTags('users')
export class UsersService {
  constructor(@InjectRepository(User)private readonly userRepository: Repository<User>) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log('ingreso a create');
    const saltRounds = 10;
    createUserDto.password = await bcrypt.hash(createUserDto.password, saltRounds);
    const newUser = this.userRepository.create(createUserDto);
    console.log(newUser);
    if(!newUser){
      throw new NotFoundException(`Email exist`);
    }
    
    return await this.userRepository.save(newUser);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'The found records' })
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  @ApiOperation({ summary: 'Get a single user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'The found record' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }


  @ApiOperation({ summary: 'Get a single user by email' })
  @ApiParam({ name: 'email', type: 'string', description: 'User email' })
  @ApiResponse({ status: 200, description: 'The found record' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User #${email} not found`);
    }
    return user;
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    // Update the propertys of user with dto data
    Object.assign(user, updateUserDto); 
    return await this.userRepository.save(user);
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 204, description: 'The record has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User #${id} not found`);
    }
  }
}