import catchAsync from '../../../shared/catchAsync';
import serveResponse from '../../../shared/serveResponse';
import { PaymentService } from './Payment.service';
import { paypal } from './Payment.utils';

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

    captureOrder: catchAsync(async (req, res) => {
      const { data, statusCode } = await PaymentService.paypal.captureOrder(
        req.query.orderID as string,
      );

      console.log(data.purchase_units[0].payments.captures[0].id);

      serveResponse(res, {
        message: 'Order capture successfully.',
        data,
        statusCode,
      });
    }),

    subscribeOrder: catchAsync(async (req, res) => {
      const data = await PaymentService.paypal.subscription(req.body);

      serveResponse(res, {
        message: 'Order subscribe successfully.',
        data,
      });
    }),
  },
  // * paypal payment -> end
};
