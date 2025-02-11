import bt from 'braintree';
import config from '../../../config';
import {
  Client,
  Environment,
  LogLevel,
  OrdersController,
  PaymentsController,
} from '@paypal/paypal-server-sdk';
import axios from 'axios';

export const braintree = new bt.BraintreeGateway({
  environment:
    config.node_env === 'production'
      ? bt.Environment.Production
      : bt.Environment.Sandbox,
  merchantId: config.payment.braintree.merchantId as string,
  publicKey: config.payment.braintree.publicKey as string,
  privateKey: config.payment.braintree.privateKey as string,
});

export const paypalClient = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: config.payment.paypal.client as string,
    oAuthClientSecret: config.payment.paypal.secret as string,
  },
  timeout: 0,
  environment:
    process.env.NODE_ENV === 'production'
      ? Environment.Production
      : Environment.Sandbox,
  logging: {
    logLevel: LogLevel.Info,
    logRequest: { logBody: true },
    logResponse: { logHeaders: true },
  },
});

async function getPaypalAccessToken() {
  const response = await axios.post(
    `${config.url.paypal_base_url}/v1/oauth2/token`,
    'grant_type=client_credentials',
    {
      auth: {
        username: config.payment.paypal.client as string,
        password: config.payment.paypal.secret as string,
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  );

  return response.data.access_token;
}

export const paypal = {
  order: new OrdersController(paypalClient),
  payment: new PaymentsController(paypalClient),
  token: getPaypalAccessToken,
};
