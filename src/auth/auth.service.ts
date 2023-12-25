import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    try {
      const { password, ...payload } = signUpDto;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userModel.create({
        ...payload,
        password: hashedPassword,
      });

      const token = this.jwtService.sign({ email: user.email });
      return { token };
    } catch (error) {
      if (error.keyPattern.phoneNumber) {
        throw new ConflictException('Duplicate Phone number entered');
      }
      if (error.keyPattern.email) {
        throw new ConflictException('Duplicate Email entered');
      }
      throw error;
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ email: user.email });
    return { token };
  }

  async getMe(token: string): Promise<any> {
    try {
      const decodedToken = this.jwtService.verify(token);
      const { email } = decodedToken;

      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const { password, _id, __v, ...restPayload } = user.toObject();

      return restPayload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
