import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({description: "User's name",example: 'John Doe'})
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({description: "User's email address",example: 'john.doe@example.com'})
  email: string;

  @ApiProperty({description: "User's password",example: 'SecurePassword123'})
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
 @IsOptional()
  @IsString()
  @ApiProperty({description: "User's name (optional for updates)",example: 'John S. Doe',required: false})
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({description: "User's email address (optional for updates)",example: 'john.s.doe@example.com',required: false})
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @ApiProperty({description: "User's new password (optional for updates)",example: 'NewPassword123',required: false})
  password?: string;
}