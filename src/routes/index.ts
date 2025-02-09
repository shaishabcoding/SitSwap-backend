import express, { Router } from 'express';
import { UserRoutes } from '../app/modules/user/User.route';

const router = express.Router();

const apiRoutes: { path: string; route: Router }[] = [
  {
    path: '/',
    route: UserRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
