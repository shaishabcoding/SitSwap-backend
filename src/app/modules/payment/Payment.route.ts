import { Router } from 'express';
import { PaymentController } from './Payment.controller';
// import auth from '../../middlewares/auth'; // TODO

const router = Router();

// router.use(auth('user', 'admin')); // ? verify s/he is a user // TODO

// // * brain tree payment -> start
// const brainTreeRoutes = Router();

// brainTreeRoutes.get('/client-token', PaymentController.braintree.clientToken);

// // * brain tree payment -> end

// router.use('/brain-tree', brainTreeRoutes);

// * paypal payment -> start
const paypalRouter = Router();

paypalRouter.post('/create-order', PaymentController.paypal.createOrder);
paypalRouter.post('/capture-order', PaymentController.paypal.captureOrder);
paypalRouter.post('/subscribe-order', PaymentController.paypal.subscribeOrder);

// * paypal payment -> end

//* marge routes -> start
router.use('/paypal', paypalRouter);
//* marge routes -> end

export const PaymentRoutes = router;
