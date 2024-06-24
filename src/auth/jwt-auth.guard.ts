import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  //Validate token
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
      throw new UnauthorizedException('Unauthorized');
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token, { secret:process.env.TOKEN_SECRET_KEY} );
      request.user = decoded;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}