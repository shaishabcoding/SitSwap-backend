import { Router } from 'express';
import { BundleController } from './Bundle.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BundleValidation } from './Bundle.validation';
import imageUploader from '../../middlewares/imageUploader';

const adminRoutes = Router();

adminRoutes.post(
  '/create',
  imageUploader((req, images) => {
    req.body.banner = images[0];
  }),
  validateRequest(BundleValidation.create),
  BundleController.create,
);

adminRoutes.patch(
  '/:bundleId/edit',
  imageUploader((req, images) => {
    req.body.banner = images[0];
  }, true),
  validateRequest(BundleValidation.update),
  BundleController.update,
);

adminRoutes.delete('/:bundleId/delete', BundleController.delete);

// ? >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const customerRoutes = Router();

customerRoutes.get('/', BundleController.list);

customerRoutes.get('/:slug', BundleController.retrieve);

export const BundleRoutes = { adminRoutes, customerRoutes };
