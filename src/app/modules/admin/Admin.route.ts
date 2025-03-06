import { Router } from 'express';
import { ProductRoutes } from '../product/Product.route';
import auth from '../../middlewares/auth';
import { BundleRoutes } from '../bundle/Bundle.route';

const router = Router();

router.use(auth('admin')); // ! make sure this is admin 🙃

router.use('/products', ProductRoutes.adminRoutes);
router.use('/bundles', BundleRoutes.adminRoutes);

router.use('/bundles', BundleRoutes.adminRoutes);

export const AdminRoutes = router;
