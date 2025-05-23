import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './Auth.service';
import config from '../../../config';

export const AuthController = {
  login: catchAsync(async (req, res) => {
    const { token, user } = await AuthService.login(
      req.body.email,
      req.body.password,
    );

    res.cookie('refreshToken', token.refreshToken, {
      secure: config.node_env !== 'development',
      httpOnly: true,
    });

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} login successfully.`,
      data: {
        accessToken: token.accessToken,
        user,
      },
    });
  }),

  changePassword: catchAsync(async (req, res) => {
    const { token } = await AuthService.changePassword(
      req.user!,
      req.body.oldPassword,
      req.body.newPassword,
    );

    res.cookie('refreshToken', token.refreshToken, {
      secure: config.node_env !== 'development',
      httpOnly: true,
    });

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Password changed successfully.',
      data: {
        accessToken: token.accessToken,
      },
    });
  }),

  refreshToken: catchAsync(async (req, res) => {
    const data = await AuthService.refreshToken(req.cookies.refreshToken);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Access Token generate successfully.',
      data,
    });
  }),

  forgetPassword: catchAsync(async (req, res) => {
    await AuthService.forgetPassword(req.body.email);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Reset link send successfully. Check your email.',
    });
  }),

  resetPassword: catchAsync(async (req, res) => {
    const { token, user } = await AuthService.resetPassword(req);

    res.cookie('refreshToken', token.refreshToken, {
      secure: config.node_env !== 'development',
      httpOnly: true,
    });

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Password reset successfully.',
      data: {
        accessToken: token.accessToken,
        user,
      },
    });
  }),

  logout: catchAsync(async (_req, res) => {
    res.clearCookie('refreshToken', {
      secure: config.node_env !== 'development',
      httpOnly: true,
    });

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Logged out successfully',
    });
  }),
};
