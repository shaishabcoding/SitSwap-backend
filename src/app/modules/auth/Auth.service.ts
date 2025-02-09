import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import User from '../user/User.model';
import bcrypt from 'bcrypt';
import { jwtHelper } from '../../../helpers/jwtHelper';
import config from '../../../config';
import IUser from '../user/User.interface';
import { Secret } from 'jsonwebtoken';
import { sendEmail } from '../../../helpers/sendMail';
import { makeResetBody } from './Auth.constant';
import { Request } from 'express';

export const AuthService = {
  async login(email: string, password: string) {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');

    const accessToken = jwtHelper.createToken(
      { email: user.email, userId: user._id, role: user.role },
      config.jwt.jwt_secret as string,
      config.jwt.jwt_expire_in as string,
    );

    const refreshToken = jwtHelper.createToken(
      { email: user.email, userId: user._id, role: user.role },
      config.jwt.jwtRefreshSecret as string,
      config.jwt.jwtRefreshExpiresIn as string,
    );

    return {
      token: {
        accessToken,
        refreshToken,
      },
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    };
  },

  async changePassword(user: IUser, oldPassword: string, newPassword: string) {
    if (!(await bcrypt.compare(oldPassword, user.password)))
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid password');

    user.password = newPassword;
    await user.save();

    // ^ also login user if they changed password
    return await this.login(user.email, newPassword);
  },

  // ^ This will make a accessToken if refreshToken is valid.
  async refreshToken(token: string) {
    if (!token) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Access Denied!');

    const { userId } = jwtHelper.verifyToken(
      token,
      config.jwt.jwtRefreshSecret as Secret,
    );

    const user = await User.findById(userId);

    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!');

    const accessToken = jwtHelper.createToken(
      { email: user.email, userId: user._id, role: user.role },
      config.jwt.jwt_secret as string,
      config.jwt.jwt_expire_in as string,
    );

    return { accessToken };
  },

  async forgetPassword(email: string) {
    const user = await User.findOne({
      email,
    });

    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found.');

    const resetToken = jwtHelper.createToken(
      {
        email: user.email,
        userId: user._id,
        role: user.role,
        isResetToken: true, // ! important: because anyone can use accessToken 🙃
      },
      config.jwt.jwt_secret as string,
      '15m',
    );

    await sendEmail(
      user.email,
      'Password Reset Request',
      makeResetBody(resetToken),
    );
  },

  async resetPassword({ user, body, authData }: Request) {
    if (!authData!.isResetToken)
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token.');

    if (!user) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid user.');

    user.password = body.password;

    await user.save();

    // ^ also login user if they reset password
    return await this.login(user.email, body.password);
  },
};
