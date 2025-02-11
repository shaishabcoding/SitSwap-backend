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
      buy_price: z
        .string()
        .transform(val => parseFloat(val)) // Convert string to number
        .refine(val => !isNaN(val), {
          message: 'Buy price must be a valid number',
        })
        .pipe(z.number().positive('Buy price must be a positive number')) // Apply positive validation after conversion to number
        .optional(),
      rent_price: z
        .string()
        .transform(val => parseFloat(val)) // Convert string to number
        .refine(val => !isNaN(val), {
          message: 'Rent price must be a valid number',
        })
        .pipe(z.number().positive('Rent price must be a positive number')) // Apply positive validation after conversion to number
        .optional(),
      stock: z
        .string()
        .transform(val => parseInt(val)) // Convert string to integer
        .refine(val => !isNaN(val), {
          message: 'Stock must be a valid integer',
        })
        .pipe(z.number().int('Stock must be a non-negative integer'))
        .refine(val => val > 0, {
          message: 'Stock must be greater than 0',
        }), // Ensure stock is an integer
      images: z
        .array(z.string().min(1, 'Image path is required'))
        .min(1, 'At least one image is required'),
      description: z.string().min(1, 'Description is required'),
      dimension: z
        .string()
        .transform(val => JSON.parse(val)) // Parse string to object
        .refine(val => typeof val === 'object' && Object.keys(val).length > 0, {
          message: 'Dimension must be a valid object',
        }),
      specifications: z
        .string()
        .transform(val => JSON.parse(val)) // Parse string to array
        .refine(val => Array.isArray(val) && val.length > 0, {
          message: 'Specifications must be a valid array',
        }),
      isAvailable: z
        .string()
        .refine(val => val === 'true' || val === 'false', {
          message: 'isAvailable must be "true" or "false"',
        })
        .transform(val => val === 'true'), // Converts "true" to true, "false" to false
      isRentable: z
        .string()
        .refine(val => val === 'true' || val === 'false', {
          message: 'isRentable must be "true" or "false"',
        })
        .transform(val => val === 'true'), // Converts "true" to true, "false" to false
    }),
  }),

  update: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required').optional(),
      room_type: z.string().min(1, 'Room type is required').optional(),
      item_type: z.string().min(1, 'Item type is required').optional(),
      color: z.string().min(1, 'Color is required').optional(),
      size: z.string().min(1, 'Size is required').optional(),
      material: z.string().min(1, 'Material is required').optional(),
      buy_price: z
        .string()
        .transform(val => parseFloat(val)) // Convert string to number
        .refine(val => !isNaN(val), {
          message: 'Buy price must be a valid number',
        })
        .pipe(z.number().positive('Buy price must be a positive number')) // Apply positive validation after conversion to number
        .optional(),
      rent_price: z
        .string()
        .transform(val => parseFloat(val)) // Convert string to number
        .refine(val => !isNaN(val), {
          message: 'Rent price must be a valid number',
        })
        .pipe(z.number().positive('Rent price must be a positive number')) // Apply positive validation after conversion to number
        .optional(),
      stock: z
        .string()
        .transform(val => parseInt(val)) // Convert string to integer
        .refine(val => !isNaN(val), {
          message: 'Stock must be a valid integer',
        })
        .pipe(z.number().int('Stock must be a non-negative integer'))
        .refine(val => val > 0, {
          message: 'Stock must be greater than 0',
        }) // Ensure stock is an integer
        .optional(),
      images: z
        .array(z.string().min(1, 'Image path is required'))
        .min(1, 'At least one image is required')
        .optional(),
      description: z.string().min(1, 'Description is required').optional(),
      dimension: z
        .string()
        .transform(val => JSON.parse(val)) // Parse string to object
        .refine(val => typeof val === 'object' && Object.keys(val).length > 0, {
          message: 'Dimension must be a valid object',
        })
        .optional(),
      specifications: z
        .string()
        .transform(val => JSON.parse(val)) // Parse string to array
        .refine(val => Array.isArray(val) && val.length > 0, {
          message: 'Specifications must be a valid array',
        })
        .optional(),
      isAvailable: z
        .string()
        .refine(val => val === 'true' || val === 'false', {
          message: 'isAvailable must be "true" or "false"',
        })
        .transform(val => val === 'true') // Converts "true" to true, "false" to false
        .optional(),
      isRentable: z
        .string()
        .refine(val => val === 'true' || val === 'false', {
          message: 'isRentable must be "true" or "false"',
        })
        .transform(val => val === 'true') // Converts "true" to true, "false" to false
        .optional(),
    }),
  }),
};
