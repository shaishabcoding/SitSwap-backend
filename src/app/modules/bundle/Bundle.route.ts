import { Router } from 'express';
<<<<<<< HEAD
import imageUploader from '../../middlewares/imageUploader';
import purifyRequest from '../../middlewares/purifyRequest';
import { BundleValidation } from './Bundle.validation';
import { BundleController } from './Bundle.controller';

// * admin routes -> Start
=======
import { BundleController } from './Bundle.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BundleValidation } from './Bundle.validation';
import imageUploader from '../../middlewares/imageUploader';
import auth from '../../middlewares/auth';
import { ReviewController } from '../review/Review.controller';
import { ReviewValidation } from '../review/Review.validation';

>>>>>>> d7c4d194fee26245db6b8497e47d63fc4fd6f703
const adminRoutes = Router();

adminRoutes.post(
  '/create',
  imageUploader((req, images) => {
<<<<<<< HEAD
    req.body.images = images;

    req.body.user = req.user!._id;
    req.body.products = JSON.parse(req.body.products);
  }),
  purifyRequest(BundleValidation.create),
=======
    req.body.banner = images[0];

    req.body.products = JSON.parse(req.body.products);
    req.body.additional = JSON.parse(req.body.additional);

    req.body.user = req.user!._id;
  }),
  validateRequest(BundleValidation.create),
>>>>>>> d7c4d194fee26245db6b8497e47d63fc4fd6f703
  BundleController.create,
);

adminRoutes.patch(
  '/:bundleId/edit',
  imageUploader((req, images) => {
<<<<<<< HEAD
    req.body.images = images;
  }, true),
  purifyRequest(BundleValidation.update),
=======
    req.body.banner = images[0];
  }, true),
  validateRequest(BundleValidation.update),
>>>>>>> d7c4d194fee26245db6b8497e47d63fc4fd6f703
  BundleController.update,
);

adminRoutes.delete('/:bundleId/delete', BundleController.delete);

<<<<<<< HEAD
// * admin routes -> End
//>>>>>>>>>>>>>>>>>>>>>>>
const customerRoutes = Router();

export const BundleRoutes = {
  adminRoutes,
  customerRoutes,
};
=======
// ? >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const customerRoutes = Router();

customerRoutes.get('/', BundleController.list);

customerRoutes.get('/:slug', BundleController.retrieve);

customerRoutes.patch(
  '/:bundleSlug/reviews/store',
  auth('admin', 'user'),
  validateRequest(ReviewValidation.store),
  ReviewController.store,
);

customerRoutes.get(
  '/:slug/reviews',
  ({ body, params }, _, next) => ((body.bundle = params.slug), next()),
  ReviewController.list,
);

export const BundleRoutes = { adminRoutes, customerRoutes };
>>>>>>> d7c4d194fee26245db6b8497e47d63fc4fd6f703
