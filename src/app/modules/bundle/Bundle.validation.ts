import { Types } from 'mongoose';
import { z } from 'zod';

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
          z.string().refine(id => Types.ObjectId.isValid(id), {
            message: 'Invalid product ID',
          }),
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
};
