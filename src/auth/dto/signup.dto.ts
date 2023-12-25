import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum UserRole {
  User = 'user',
  Admin = 'admin',
}

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly firstname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly lastname: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  @MinLength(9)
  @MaxLength(14)
  readonly phoneNumber: string;

  @ApiProperty()
  @IsString()
  readonly address: string;

  @IsString()
  @ApiProperty()
  @IsEnum(UserRole, {
    message: 'Invalid user role',
  })
  readonly role: string = 'user';

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty()
  readonly password: string;
}
