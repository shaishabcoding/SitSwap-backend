import { braintree, paypal } from './Payment.utils';

export const PaymentService = {
  // * brain tree payment -> start
  braintree: {
    async clientToken() {
      return await braintree.clientToken.generate({});
    },
  },
  // * brain tree payment -> end
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // * paypal tree payment -> start
  paypal: {
    async createOrder(cart: any) {
      const collect = {
        body: {
          intent: 'CAPTURE',
          purchaseUnits: [
            {
              amount: {
                currencyCode: 'USD',
                value: '100',
              },
            },
          ],
        },
        prefer: 'return=minimal',
      };

      const { body, statusCode } = await paypal.order.ordersCreate(collect);
      // Get more response info...
      // const { statusCode, headers } = httpResponse;
      return {
        data: JSON.parse(body as string),
        statusCode,
      };
    },
  },
  // * paypal tree payment -> end
};
