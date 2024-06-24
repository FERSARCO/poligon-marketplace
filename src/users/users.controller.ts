import { Controller, Post, Body,Res, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  //Create a new user
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ description: 'The user has been successfully created.' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: CreateUserDto })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
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
}