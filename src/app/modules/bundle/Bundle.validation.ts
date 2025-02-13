import { Types } from 'mongoose';
import { z } from 'zod';
import Product from '../product/Product.model';

export const BundleValidation = {
  create: z.object({
    body: z.object({
      name: z.string().trim().min(1, 'Name is required'),
      description: z.string().trim().min(1, 'Description is required'),
      images: z
        .array(
          z.string().refine(
            value => {
              return value.startsWith('http') || value.startsWith('/');
            },
            {
              message: 'Image must be a valid URL or a file path',
            },
          ),
        )
        .min(1, 'At least one image is required'),
      products: z
        .array(
          z.string().refine(
            async id => {
              return await Product.exists({ _id: id });
            },
            {
              message: 'Invalid product ID or product does not exist',
            },
          ),
        )
        .min(1, 'At least one product is required'),
      isRentable: z
        .union([z.boolean(), z.string()])
        .transform(val => (typeof val === 'string' ? val === 'true' : val))
        .default(true),
      isAvailable: z
        .union([z.boolean(), z.string()])
        .transform(val => (typeof val === 'string' ? val === 'true' : val))
        .default(true),
      buy_price: z.coerce
        .number()
        .min(0, 'Buy price must be a positive number'),
      rent_price: z.coerce
        .number()
        .min(0, 'Rent price must be a positive number'),
      user: z.union([
        z.string().refine(id => Types.ObjectId.isValid(id), {
          message: 'Invalid user ID',
        }),
        z.instanceof(Types.ObjectId),
      ]),
    }),
  }),

  update: z.object({
    body: z.object({
      name: z.string().trim().min(1, 'Name is required').optional(),
      description: z
        .string()
        .trim()
        .min(1, 'Description is required')
        .optional(),
      images: z
        .array(
          z
            .string()
            .refine(
              value => value.startsWith('http') || value.startsWith('/'),
              { message: 'Image must be a valid URL or a file path' },
            ),
        )
        .min(1, 'At least one image is required')
        .optional(),
      products: z
        .union([z.string(), z.array(z.string())])
        .transform(value =>
          typeof value === 'string' ? JSON.parse(value) : value,
        )
        .refine(
          async products => {
            if (!Array.isArray(products)) return false;
            const productExists = await Promise.all(
              products.map(id => Product.exists({ _id: id })),
            );
            return productExists.every(Boolean);
          },
          {
            message: 'Invalid product ID or product does not exist',
          },
        )
        .optional(),
      isRentable: z
        .union([z.boolean(), z.string()])
        .transform(val => val === true || val === 'true')
        .optional(),
      isAvailable: z
        .union([z.boolean(), z.string()])
        .transform(val => val === true || val === 'true')
        .optional(),
      buy_price: z
        .union([z.string(), z.number()])
        .transform(val => Number(val))
        .refine(val => val >= 0, {
          message: 'Buy price must be a positive number',
        })
        .optional(),
      rent_price: z
        .union([z.string(), z.number()])
        .transform(val => Number(val))
        .refine(val => val >= 0, {
          message: 'Rent price must be a positive number',
        })
        .optional(),
    }),
  }),
};
