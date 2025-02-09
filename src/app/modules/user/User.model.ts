import { Schema, model } from 'mongoose';
import IUser from './User.interface';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser>(
  {
    avatar: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user',
    },
    otp: { type: String },
    otpExpAt: { type: Date },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
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
