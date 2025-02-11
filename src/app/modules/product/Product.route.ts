import { Router } from 'express';
import { ProductController } from './Product.controller';
import imageUploader from '../../middlewares/imageUploader';
import purifyRequest from '../../middlewares/purifyRequest';
import { ProductValidation } from './Product.validation';

const adminRoutes = Router();

adminRoutes.post(
  '/create',
  imageUploader((req, images) => {
    req.body.images = images;
  }),
  purifyRequest(ProductValidation.create),
  ProductController.create,
);

adminRoutes.patch(
  '/:productId/edit',
  imageUploader((req, images) => {
    req.body.images = images;
  }, true),
  purifyRequest(ProductValidation.update),
  ProductController.update,
);

adminRoutes.delete('/:productId/delete', ProductController.delete);

const userRoutes = Router();

export const ProductRoutes = {
  adminRoutes,
  userRoutes,
};
