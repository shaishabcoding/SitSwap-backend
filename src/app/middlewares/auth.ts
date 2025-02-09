import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelper } from '../../helpers/jwtHelper';
import User from '../modules/user/User.model';
import catchAsync from '../../shared/catchAsync';

const auth = (...roles: ('user' | 'admin')[]) =>
  catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
    const tokenWithBearer = req.headers.authorization;
    if (!tokenWithBearer)
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized');

    if (tokenWithBearer && tokenWithBearer.startsWith('Bearer')) {
      const token = tokenWithBearer.split(' ')[1];

      //verify token
      const authData = jwtHelper.verifyToken(
        token,
        config.jwt.jwt_secret as Secret,
      );

      const user = await User.findById(authData.userId).select('+password');

      //guard user
      if (!user || (roles.length && !roles.includes(user.role)))
        throw new ApiError(
          StatusCodes.FORBIDDEN,
          "You don't have permission to access this api",
        );

      //set user to header
      req.user = user;
      req.authData = authData;

      next();
    }
  });

export default auth;
