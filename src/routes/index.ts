import { Router } from 'express';
import { AuthRoutes } from '../app/modules/auth/Auth.route';
import { AdminRoutes } from '../app/modules/admin/Admin.route';
import { ProductRoutes } from '../app/modules/product/Product.route';
import { PaymentRoutes } from '../app/modules/payment/Payment.route';
import { BundleRoutes } from '../app/modules/bundle/Bundle.route';

const router = Router();

const apis: { path: string; route: Router }[] = [
  // * AUTH routes => start
  {
    path: '/',
    route: AuthRoutes,
  },
  // * AUTH routes => end
  //>>>>>>>>>>>>>>>>>>>>>
  // * ADMIN routes => start
  {
    path: '/admin',
    route: AdminRoutes,
  },
  // * ADMIN routes => end
  //>>>>>>>>>>>>>>>>>>>>>>
  // * PRODUCT routes => start
  {
    path: '/products',
    route: ProductRoutes.customerRoutes,
  },
  // * PRODUCT routes => end
  //>>>>>>>>>>>>>>>>>>>>>>>>
  //>>>>>>>>>>>>>>>>>>>>>>
  // * BUNDLE routes => start
  {
    path: '/bundles',
    route: BundleRoutes.customerRoutes,
  },
  // * BUNDLE routes => end
  //>>>>>>>>>>>>>>>>>>>>>>>>
  // * PAYMENT routes => start
  {
    path: '/payment',
    route: PaymentRoutes,
  },
  // * PAYMENT routes => end
];

apis.forEach(({ path, route }) => router.use(path, route));

export default router;
