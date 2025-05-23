import { Router } from 'express';
import purifyRequest from '../../middlewares/purifyRequest';
import imageUploader from '../../middlewares/imageUploader';
import { UserValidation } from '../user/User.validation';
import { UserController } from '../user/User.controller';
import { AuthController } from './Auth.controller';
import { limiter } from './Auth.utils';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/register',
  limiter,
  imageUploader((req, images) => {
    req.body.avatar = images[0];
  }),
  purifyRequest(UserValidation.registerSchema),
  UserController.register,
);

router.patch(
  '/update-profile',
  auth('user', 'admin'),
  imageUploader((req, images) => {
    req.body.avatar = images[0];
  }, true),
  purifyRequest(UserValidation.updateSchema),
  UserController.modify,
);

router.post('/login', limiter, AuthController.login);

router.patch(
  '/change-password',
  limiter,
  auth('user', 'admin'),
  AuthController.changePassword,
);

router.post('/refresh-token', AuthController.refreshToken);

router.post('/forgot-password', limiter, AuthController.forgetPassword);

router.post(
  '/reset-password',
  auth('admin', 'user'),
  AuthController.resetPassword,
);

router.post('/logout', auth('user', 'admin'), AuthController.logout);

router.delete(
  '/delete-user/:userId',
  auth('user', 'admin'),
  UserController.delete,
);

export const AuthRoutes = router;
