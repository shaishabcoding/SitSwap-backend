import bt from 'braintree';
import config from '../../../config';

export const braintree = new bt.BraintreeGateway({
  environment:
    config.node_env === 'production'
      ? bt.Environment.Production
      : bt.Environment.Sandbox,
  merchantId: config.payment.braintree.merchantId as string,
  publicKey: config.payment.braintree.publicKey as string,
  privateKey: config.payment.braintree.privateKey as string,
});
