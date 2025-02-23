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
      buyPrice: z
        .string()
        .transform(val => Number(val))
        .optional(),
      rentPrice: z
        .string()
        .transform(val => Number(val))
        .optional(),
      stock: z
        .string()
        .transform(val => Number(val))
        .refine(val => val >= 1, { message: 'Stock must be at least 1' }),
      isAvailable: z
        .string()
        .transform(val => val === 'true')
        .optional(),
      isRentable: z
        .string()
        .transform(val => val === 'true')
        .optional(),
      additional: z.record(z.string()).optional(),
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
      buyPrice: z
        .string()
        .transform(val => Number(val))
        .optional(),
      rentPrice: z
        .string()
        .transform(val => Number(val))
        .optional(),
      stock: z
        .string()
        .transform(val => Number(val))
        .optional(),
      isAvailable: z
        .string()
        .transform(val => val === 'true')
        .optional(),
      isRentable: z
        .string()
        .transform(val => val === 'true')
        .optional(),
      additional: z.record(z.string()).optional(),
    }),
  }),
};
