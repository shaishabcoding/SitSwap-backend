import { Router } from 'express';
import { ProductController } from './Product.controller';

const adminRoutes = Router();

adminRoutes.post('/create', ProductController.create);

const userRoutes = Router();

export const ProductRoutes = {
  adminRoutes,
  userRoutes,
};
