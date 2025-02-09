import express, { Router } from 'express';
import { AuthRoutes } from '../app/modules/auth/Auth.route';

const router = express.Router();

const apiRoutes: { path: string; route: Router }[] = [
  {
    path: '/',
    route: AuthRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
