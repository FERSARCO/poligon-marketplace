import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { Cart } from 'src/cart/entities/cart.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User,Cart]),
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.TOKEN_SECRET_KEY,
      signOptions: { expiresIn: '28800s' },
    }),User
  ],
  controllers:[AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy,UsersService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}