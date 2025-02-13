import { Schema, model } from 'mongoose';
import IUser from './User.interface';
import bcrypt from 'bcrypt';
import validateEduEmail from '../../../util/validateEduEmail';

const userSchema = new Schema<IUser>(
  {
    avatar: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isStudent: {
      type: Boolean,
      default: false,
    },
    otp: { type: String },
    otpExpAt: { type: Date },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  this.isStudent = await validateEduEmail(this.email); // ! only student can sell their old products

  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

const User = model<IUser>('User', userSchema);

export default User;
