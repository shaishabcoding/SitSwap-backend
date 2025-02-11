import { braintree } from './Payment.utils';

export const PaymentService = {
  // * brain tree payment -> start
  braintree: {
    async clientToken() {
      return await braintree.clientToken.generate({});
    },
  },
  // * brain tree payment -> end
};
