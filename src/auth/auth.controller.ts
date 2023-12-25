import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Get('/me')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'authorization',
    required: false,
  })
  @UseGuards(AuthGuard())
  getMe(@Headers('authorization') authorization: string): Promise<any> {
    const token = authorization.split(' ')[1] || null;
    return this.authService.getMe(token);
  }
}
