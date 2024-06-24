import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    const validation = await this.comparePassword(pass, user.password);
    if (user && validation) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const payload = { loginDto }; // Carga útil del token
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.TOKEN_SECRET_KEY,
      }),
    };
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
