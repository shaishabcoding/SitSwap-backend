import { StatusCodes } from 'http-status-codes';
import { catchAsyncWithCallback } from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './User.service';

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
  }),
};
