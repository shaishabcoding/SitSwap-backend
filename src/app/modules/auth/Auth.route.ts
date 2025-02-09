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

router.post('/login', limiter, AuthController.login);

router.patch(
  '/change-password',
  limiter,
  auth('user', 'admin'),
  AuthController.changePassword,
);

router.post('/refresh-token', AuthController.refreshToken);

export const AuthRoutes = router;
