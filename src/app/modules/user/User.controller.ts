import { StatusCodes } from 'http-status-codes';
import catchAsync, { catchAsyncWithCallback } from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './User.service';
import { imagesUploadRollback } from '../../middlewares/imageUploader';
import ServerError from '../../../errors/ServerError';
import config from '../../../config';

export const UserController = {
  register: catchAsyncWithCallback(async (req, res) => {
    const userData = req.body;

    const newUser = await UserService.register(userData);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'User register successfully.',
      data: newUser,
    });
  }, imagesUploadRollback),

  modify: catchAsyncWithCallback(async (req, res) => {
    await UserService.modify(req.user!, req.body);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Profile update successfully',
      data: req.body,
    });
  }, imagesUploadRollback),

  delete: catchAsync(async (req, res) => {
    const { userId } = req.params;
    const authUser = req.user;

    if (authUser!.role !== 'admin' && authUser!._id!.toString() !== userId)
      throw new ServerError(
        StatusCodes.FORBIDDEN,
        "You can't delete this user",
      );

    if (authUser!._id!.toString() === userId)
      res.clearCookie('refreshToken', {
        secure: config.node_env !== 'development',
        httpOnly: true,
      });

    await UserService.delete(userId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'User delete successfully',
    });
  }),
};
