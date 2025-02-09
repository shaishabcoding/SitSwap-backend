import { StatusCodes } from 'http-status-codes';
import { catchAsyncWithCallback } from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './User.service';
import { imagesUploadRollback } from '../../middlewares/imageUploader';

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
};
