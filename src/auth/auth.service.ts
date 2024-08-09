import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { ApiOperation,ApiParam } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User)private readonly userRepository: Repository<User>,private usersService: UsersService,private jwtService: JwtService) {}

  @ApiOperation({ summary: 'Validate email and password user' })
  @ApiParam({ name: 'email', type: 'string'})
  @ApiParam({ name: 'pass', type: 'string'})
  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(`User with email ${email} not found`, HttpStatus.NOT_FOUND)
    }
    const validation = await this.comparePassword(pass, user.password);
    if (user && validation) {
      user.password= undefined;
      return user;
    }
    return null;
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiParam({ name: 'loginDto', type: LoginDto})
  async login(loginDto: LoginDto) {
    const payload = { loginDto }
    return {access_token: this.jwtService.sign(payload, {secret: process.env.TOKEN_SECRET_KEY})};
  }

  @ApiOperation({ summary: 'Compare hash and password user' })
  @ApiParam({ name: 'password', type: 'string'})
  @ApiParam({ name: 'hash', type: 'string'})
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
