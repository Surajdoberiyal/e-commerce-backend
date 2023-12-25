import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MinLength(6)
  readonly password: string;
}
