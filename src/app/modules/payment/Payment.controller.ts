import catchAsync from '../../../shared/catchAsync';
import serveResponse from '../../../shared/serveResponse';
import { PaymentService } from './Payment.service';

export const PaymentController = {
  // * brain tree payment -> start
  braintree: {
    clientToken: catchAsync(async (req, res) => {
      const { clientToken } = await PaymentService.braintree.clientToken();

      serveResponse(res, {
        message: 'Generate client token successfully.',
        data: {
          clientToken,
        },
      });
    }),
  },
  // * brain tree payment -> end
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // * paypal payment -> start
  paypal: {
    createOrder: catchAsync(async (req, res) => {
      const { data, statusCode } = await PaymentService.paypal.createOrder(
        req.body,
      );

      serveResponse(res, {
        message: 'Order created successfully.',
        data,
        statusCode,
      });
    }),
  },
  // * paypal payment -> end
};
