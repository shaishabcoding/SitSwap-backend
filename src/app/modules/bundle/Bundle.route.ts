import { Router } from 'express';
import imageUploader from '../../middlewares/imageUploader';
import purifyRequest from '../../middlewares/purifyRequest';
import { BundleValidation } from './Bundle.validation';
import { BundleController } from './Bundle.controller';

// * admin routes -> Start
const adminRoutes = Router();

adminRoutes.post(
  '/create',
  imageUploader((req, images) => {
    req.body.images = images;

    req.body.user = req.user!._id;
    req.body.products = JSON.parse(req.body.products);
  }),
  purifyRequest(BundleValidation.create),
  BundleController.create,
);

adminRoutes.patch(
  '/:bundleId/edit',
  imageUploader((req, images) => {
    req.body.images = images;

    if (req.body.products) req.body.products = JSON.parse(req.body.products);
  }, true),
  purifyRequest(BundleValidation.update),
  BundleController.update,
);

// * admin routes -> End
//>>>>>>>>>>>>>>>>>>>>>>>
const customerRoutes = Router();

export const BundleRoutes = {
  adminRoutes,
  customerRoutes,
};
