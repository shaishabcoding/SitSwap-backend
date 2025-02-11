import { z } from 'zod';

export const ProductValidation = {
  create: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required'),
      room_type: z.string().min(1, 'Room type is required'),
      item_type: z.string().min(1, 'Item type is required'),
      color: z.string().min(1, 'Color is required'),
      size: z.string().min(1, 'Size is required'),
      material: z.string().min(1, 'Material is required'),
      buy_price: z.number().positive('Buy price must be a positive number').optional(),
      rent_price: z.number().positive('Rent price must be a positive number').optional(),
      stock: z.number().int().min(1, 'Stock must be a non-negative integer'),
      images: z
        .array(z.string().min(1, 'Image path is required'))
        .min(1, 'At least one image is required'),
      description: z.string().min(1, 'Description is required'),
      dimension: z
        .record(z.string(), z.string())
        .refine(
          value => Object.keys(value).length > 0,
          'Dimension must not be empty',
        ),
      specifications: z
        .array(z.string())
        .min(1, 'At least one specification is required'),
      isAvailable: z.boolean(),
      isRentable: z.boolean(),
    }),
  }),
};
