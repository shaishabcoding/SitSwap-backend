import { Router } from 'express';
import { ProductController } from './Product.controller';
import imageUploader from '../../middlewares/imageUploader';
import purifyRequest from '../../middlewares/purifyRequest';
import { ProductValidation } from './Product.validation';
<<<<<<< HEAD
import { ProductReviewController } from '../product-review/ProductReview.controller';
import auth from '../../middlewares/auth';
=======
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from '../review/Review.controller';
import { ReviewValidation } from '../review/Review.validation';
>>>>>>> d7c4d194fee26245db6b8497e47d63fc4fd6f703

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

<<<<<<< HEAD
userRoutes.patch('/:productId/review', auth(), ProductReviewController.modify);
userRoutes.delete(
  '/:productId/review/delete',
  auth(),
  ProductReviewController.delete,
);

userRoutes.get('/', ProductController.list);
userRoutes.get('/:productId', ProductController.retrieve);
userRoutes.get('/retrieve-by-ids', ProductController.retrieveByIds);
=======
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
>>>>>>> d7c4d194fee26245db6b8497e47d63fc4fd6f703

export const ProductRoutes = {
  adminRoutes,
  customerRoutes,
};
