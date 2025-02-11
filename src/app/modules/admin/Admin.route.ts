import { Router } from 'express';
import { ProductRoutes } from '../product/Product.route';
import auth from '../../middlewares/auth';

const router = Router();

router.use(auth('admin')); // ! make sure this is admin 🙃

router.use('/products', ProductRoutes.adminRoutes);

export const AdminRoutes = router;
