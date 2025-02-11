import { Router } from 'express';
import { PaymentController } from './Payment.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.use(auth('user', 'admin')); // ? verify s/he is a user

// * brain tree payment -> start
const brainTreeRoutes = Router();

brainTreeRoutes.get('/client-token', PaymentController.braintree.clientToken);

// * brain tree payment -> end

router.use('/brain-tree', brainTreeRoutes);

export const PaymentRoutes = router;
