import { Router } from 'express';
import { ProductController } from './Product.controller';
import imageUploader from '../../middlewares/imageUploader';
import purifyRequest from '../../middlewares/purifyRequest';
import { ProductValidation } from './Product.validation';
import { ProductReviewController } from '../product-review/ProductReview.controller';
import auth from '../../middlewares/auth';

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

userRoutes.patch('/:productId/review', auth(), ProductReviewController.modify);
userRoutes.delete(
  '/:productId/review/delete',
  auth(),
  ProductReviewController.delete,
);

userRoutes.get('/', ProductController.list);
userRoutes.get('/:productId', ProductController.retrieve);
userRoutes.get('/retrieve-by-ids', ProductController.retrieveByIds);

export const ProductRoutes = {
  adminRoutes,
  userRoutes,
};
