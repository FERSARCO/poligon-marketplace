import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const user = await this.authService.validateUser(loginDto.email, loginDto.password);
      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Invalid credentials',
        });
      }

      const token = await this.authService.login(loginDto); // Genera el token
      return res.status(HttpStatus.OK).json({data:user, token:token});
    } catch (err) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: err.message,
      });
    }
  }
}