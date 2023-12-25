import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop({ unique: [true, 'Duplicate Phone number entered'] })
  phoneNumber: string;

  @Prop()
  address: string;

  @Prop()
  role: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
