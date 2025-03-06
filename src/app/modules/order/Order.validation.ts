import { z } from 'zod';
import Product from '../product/Product.model';
import User from '../user/User.model';

const productDetailsSchema = z.object({
  bundle: z
    .string()
    .optional()
    /** TODO: Check if bundle exists */
    .refine(async id => !id || !!(await Product.exists({ _id: id })), {
      message: 'Bundle not found',
    }),
  product: z
    .string()
    .optional()
    .refine(async id => !id || !!(await Product.exists({ _id: id })), {
      message: 'Product not found',
    }),
  price: z.number().min(0),
  month: z.number().optional(),
  quantity: z.number().min(1),
  type: z.enum(['rent', 'buy']),
  productType: z.enum(['product', 'bundle']),
});

export const OrderValidation = {
  create: z.object({
    body: z.object({
      productDetails: z.array(productDetailsSchema),
      customer: z
        .string()
        .refine(async id => !!(await User.exists({ _id: id })), {
          message: 'Customer not found',
        }),
      amount: z.number().min(0),
    }),
  }),
};
