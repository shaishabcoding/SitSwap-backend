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
};
