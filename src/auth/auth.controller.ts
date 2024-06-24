import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  //User Login
  @ApiOperation({ summary: 'Login user register' })
  @ApiResponse({ status: 200, description: 'Successfully authenticated user'})
  @ApiResponse({ status: 400, description: 'Product not found' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const user = await this.authService.validateUser(loginDto.email, loginDto.password);
      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ok:false,status:401, message: 'Invalid Credentials', data:[], token:[]});
      }

      const token = await this.authService.login(loginDto);
      return res.status(HttpStatus.OK).json({ok:true,status:200, message: 'Successfully authenticated user', data:user, token:token});
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ok:false,status:500, message: error.message, data:[], token:[]});
    }
  }
}