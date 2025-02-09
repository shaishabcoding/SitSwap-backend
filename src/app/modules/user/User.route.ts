import { Router } from 'express';
import { UserValidation } from './User.validation';
import { UserController } from './User.controller';
import purifyRequest from '../../middlewares/purifyRequest';
import imageUploader from '../../middlewares/imageUploader';

const router = Router();

router.post(
  '/register',
  imageUploader((req, images) => {
    req.body.avatar = images[0];
  }),
  purifyRequest(UserValidation.registerSchema),
  UserController.register,
);

export const UserRoutes = router;
