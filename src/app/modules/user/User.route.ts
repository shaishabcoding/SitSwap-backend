import { Router } from 'express';
import { UserValidation } from './User.validation';
import { UserController } from './User.controller';
import purifyRequest from '../../middlewares/purifyRequest';

const router = Router();

router.post(
  '/register',
  purifyRequest(UserValidation.registerSchema),
  UserController.register,
);

export const UserRoutes = router;
