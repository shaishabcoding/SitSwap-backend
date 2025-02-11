import axios from 'axios';
import { braintree, paypal } from './Payment.utils';
import config from '../../../config';

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

    async captureOrder(orderID: string) {
      const collect = {
        id: orderID,
        prefer: 'return=minimal',
      };

      const { body, statusCode } = await paypal.order.ordersCapture(collect);
      return {
        data: JSON.parse(body as string),
        statusCode,
      };
    },

    async subscription(data: any) {
      const token = await paypal.token();
      // const { product_id } = req.body;

      const response = await axios.post(
        `${config.url.paypal_base_url}/v1/billing/plans`,
        {
          product_id: 'sadfklasfhsdfsdjafhsfd',
          name: '5-Month Rental Plan',
          description: 'Rent this product for $5/month for 5 months',
          status: 'ACTIVE',
          billing_cycles: [
            {
              frequency: { interval_unit: 'MONTH', interval_count: 1 },
              tenure_type: 'REGULAR',
              sequence: 1,
              total_cycles: 5, // Auto stops after 5 months
              pricing_scheme: {
                fixed_price: { value: '5.00', currency_code: 'USD' },
              },
            },
          ],
          payment_preferences: {
            auto_bill_outstanding: true,
            setup_fee: { value: '0', currency_code: 'USD' },
            setup_fee_failure_action: 'CONTINUE',
            payment_failure_threshold: 3,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return { plan_id: response.data.id };
    },
  },
  // * paypal tree payment -> end
};
