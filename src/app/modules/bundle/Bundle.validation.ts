import { z } from 'zod';
import Product from '../product/Product.model';

export const BundleValidation = {
  create: z.object({
    body: z.object({
      name: z.string().trim().min(1, 'Name is required'),
      description: z.string().trim().min(1, 'Description is required'),
      products: z
        .array(
          z.string().refine(async id => !!(await Product.exists({ _id: id })), {
            message: 'Product not found',
          }),
        )
        .min(1, 'At least one product is required')
        .nonempty('Products cannot be empty'),
      buy_price: z.number().optional(),
      rent_price: z.number().optional(),
      stock: z.number().min(1, 'Stock must be at least 1'),
      isAvailable: z.boolean().optional(),
      isRentable: z.boolean().optional(),
      additional: z.record(z.string()),
    }),
  }),

  update: z.object({
    body: z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      products: z
        .array(
          z.string().refine(async id => !!(await Product.exists({ _id: id })), {
            message: 'Product not found',
          }),
        )
        .optional(),
      buy_price: z.number().optional(),
      rent_price: z.number().optional(),
      stock: z.number().optional(),
      isAvailable: z.boolean().optional(),
      isRentable: z.boolean().optional(),
      additional: z.record(z.string()).optional(),
    }),
  }),
};
