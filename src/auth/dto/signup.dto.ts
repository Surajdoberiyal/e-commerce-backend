import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum UserRole {
  User = 'user',
  Admin = 'admin',
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastname: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @MinLength(9)
  @MaxLength(14)
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  address: string;

  @IsString()
  @ApiProperty()
  @IsEnum(UserRole, {
    message: 'Invalid user role',
  })
  role: string = 'user';
}

export class SignUpDto extends UpdateUserDto {
  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString()
  @MinLength(6, { message: 'Password should be at least 6 characters long' })
  @ApiProperty()
  password: string;
}
