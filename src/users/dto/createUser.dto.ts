import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({description: "User's name",example: 'John Doe'})
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({description: "User's email address",example: 'john.doe@example.com'})
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @ApiProperty({description: "User's password",example: 'SecurePassword123'})
  password: string;
}

