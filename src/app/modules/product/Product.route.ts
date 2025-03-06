import { Router } from 'express';
import { ProductController } from './Product.controller';
import imageUploader from '../../middlewares/imageUploader';
import purifyRequest from '../../middlewares/purifyRequest';
import { ProductValidation } from './Product.validation';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from '../review/Review.controller';
import { ReviewValidation } from '../review/Review.validation';

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

// >>>>>>>>>>>>>>>>>>>>>>>>>>>

const customerRoutes = Router();

customerRoutes.get('/', ProductController.list);

customerRoutes.patch(
  '/:productName/reviews/store',
  auth('admin', 'user'),
  validateRequest(ReviewValidation.store),
  ReviewController.store,
);

customerRoutes.get(
  '/:name/reviews',
  ({ body, params }, _, next) => ((body.product = params.name), next()),
  ReviewController.list,
);

export const ProductRoutes = {
  adminRoutes,
  customerRoutes,
};
