import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ApiOperation,ApiParam } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'username', passwordField: 'password' });
  }

  @ApiOperation({ summary: 'Validate email and password user' })
  @ApiParam({ name: 'email', type: 'string'})
  @ApiParam({ name: 'pass', type: 'string'})
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user;
  }
}