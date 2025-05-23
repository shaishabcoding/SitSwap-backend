/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  ip_address: process.env.IP_ADDRESS,
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  stripe_api_secret: process.env.STRIPE_SECRET_KEY,
  google_maps: process.env.GOOGLE_MAPS,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expire_in: process.env.JWT_EXPIRE_IN,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  payment: {
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    stripe_webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
    paypal: {
      client: process.env.PAYMENT_PAYPAL_CLIENT,
      secret: process.env.PAYMENT_PAYPAL_SECRET,
    },
    stripe: {
      client: process.env.PAYMENT_STRIPE_CLIENT,
      secret: process.env.PAYMENT_STRIPE_SECRET,
    },
    braintree: {
      merchantId: process.env.BRAINTREE_MERCHANTID,
      privateKey: process.env.BRAINTREE_PRIVATEKEY,
      publicKey: process.env.BRAINTREE_PUBLICKEY,
    },
  },
  email: {
    from: process.env.EMAIL_FROM,
    user: process.env.EMAIL_USER,
    port: process.env.EMAIL_PORT,
    host: process.env.EMAIL_HOST,
    pass: process.env.EMAIL_PASS,
  },
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
  url: {
    reset_pass_ui_link: process.env.LOCAL_BASE_URL,
    local: process.env.LOCAL_BASE_URL,
    paypal_base_url: process.env.PAYPAL_BASE_URL,
  },
  apyhub_api: process.env.APYHUB_API,
};
