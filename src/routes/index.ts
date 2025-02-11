import { Router } from 'express';
import { AuthRoutes } from '../app/modules/auth/Auth.route';
import { AdminRoutes } from '../app/modules/admin/Admin.route';

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
];

apis.forEach(({ path, route }) => router.use(path, route));

export default router;
