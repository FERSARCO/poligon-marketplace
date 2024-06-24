import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({description: 'The email of the user', example: 'test@gmail.com'})
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'The password of the user',example: 'P@$$w0rd'})
  password: string;
}