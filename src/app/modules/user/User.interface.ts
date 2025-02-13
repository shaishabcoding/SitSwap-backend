import { Document } from 'mongoose';

interface IUser extends Document {
  avatar: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isStudent: boolean;
  otp?: string;
  otpExpAt?: Date;
}

export default IUser;
