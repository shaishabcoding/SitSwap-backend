import { Router } from 'express';
import { OrderController } from './Order.controller';
import { OrderValidation } from './Order.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router.get('/', OrderController.list);
router.post(
  '/',
  validateRequest(OrderValidation.create),
  OrderController.create,
);
router.delete('/:orderId/delete', OrderController.delete);

export const OrderRoutes = router;
