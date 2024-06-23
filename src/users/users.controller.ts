import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe,UseGuards,Res, HttpStatus, HttpException, } from '@nestjs/common';
import { AuthService } from '../auth/auth.service'; 
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 
import { Response } from 'express';
import { EntityPropertyNotFoundError } from 'typeorm';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService,private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: CreateUserDto })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try{
      return await this.usersService.create(createUserDto);
   }catch (error){
    
    if (error instanceof EntityPropertyNotFoundError) {
      // Maneja la excepción de validación de la entidad
      throw new HttpException('Error de validación de la entidad', HttpStatus.BAD_REQUEST);
    } else {
      console.log('ingreso por else');
      // Maneja otros tipos de errores
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }



  
   }
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users.', type: CreateUserDto, isArray: true })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get a single user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'The found user.', type: CreateUserDto })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'The updated user.', type: UpdateUserDto })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 204, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}