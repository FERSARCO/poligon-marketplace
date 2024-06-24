import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ApiOperation,ApiParam } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),ignoreExpiration: false,secretOrKey: process.env.TOKEN_SECRET_KEY})
  }

  @ApiOperation({ summary: 'Validate payload data' })
  @ApiParam({ name: 'sub', type: 'number'})
  @ApiParam({ name: 'username', type: 'string'})
  async validate(payload: { sub: number; username: string }): Promise<User> {
    return await this.userService.findOne(payload.sub);
  }
}