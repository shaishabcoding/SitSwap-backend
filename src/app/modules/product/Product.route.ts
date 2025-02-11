import { Router } from 'express';
import { ProductController } from './Product.controller';
import imageUploader from '../../middlewares/imageUploader';

const adminRoutes = Router();

adminRoutes.post(
  '/create',
  imageUploader((req, images) => {
    req.body.images = images;
  }),
  ProductController.create,
);

const userRoutes = Router();

export const ProductRoutes = {
  adminRoutes,
  userRoutes,
};
