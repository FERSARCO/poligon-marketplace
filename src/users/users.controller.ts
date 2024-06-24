import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe,UseGuards,Res, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: CreateUserDto })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try{
       const user= await this.usersService.create(createUserDto);
       return res.status(HttpStatus.CREATED).json({ok:true,status:201, message: 'The user has been successfully created.',data:user});
   }catch (error){
      if(error.code==23505){
        return res.status(HttpStatus.BAD_REQUEST).json({ok:false,statusCode:400, message: 'The email is already registere',data:[]});
      }else{
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ok:false,statusCode:500, message:error.message,data:[]});
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



  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 204, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}