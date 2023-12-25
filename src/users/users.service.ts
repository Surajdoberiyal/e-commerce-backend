import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from 'src/auth/dto/signup.dto';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUser: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUser, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User not found`);
    }

    return updatedUser;
  }

  async delete(id: string): Promise<any> {
    await this.userModel.findByIdAndDelete(id).exec();
    return 'User Deleted successfully';
  }
}
