import { Router } from 'express';
import { BundleController } from './Bundle.controller';
import { BundleValidation } from './Bundle.validation';
import imageUploader from '../../middlewares/imageUploader';
import auth from '../../middlewares/auth';
import { ReviewController } from '../review/Review.controller';
import { ReviewValidation } from '../review/Review.validation';
import purifyRequest from '../../middlewares/purifyRequest';

const adminRoutes = Router();

adminRoutes.post(
  '/create',
  imageUploader((req, images) => {
    req.body.banner = images[0];

    req.body.products = JSON.parse(req.body.products);
    req.body.additional = JSON.parse(req.body.additional);

    req.body.user = req.user!._id;
  }),
  purifyRequest(BundleValidation.create),
  BundleController.create,
);

adminRoutes.patch(
  '/:bundleId/edit',
  imageUploader((req, images) => {
    req.body.banner = images[0];
  }, true),
  purifyRequest(BundleValidation.update),
  BundleController.update,
);

adminRoutes.delete('/:bundleId/delete', BundleController.delete);

// ? >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const customerRoutes = Router();

customerRoutes.get('/', BundleController.list);

customerRoutes.get('/:slug', BundleController.retrieve);

customerRoutes.patch(
  '/:bundleSlug/reviews/store',
  auth('admin', 'user'),
  purifyRequest(ReviewValidation.store),
  ReviewController.store,
);

customerRoutes.get(
  '/:slug/reviews',
  ({ body, params }, _, next) => ((body.bundle = params.slug), next()),
  ReviewController.list,
);

export const BundleRoutes = { adminRoutes, customerRoutes };
