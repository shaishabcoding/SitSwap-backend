import { z } from 'zod';

export const ReviewValidation = {
  store: z.object({
    body: z.object({
      rating: z
        .number()
        .min(0, { message: 'Rating must be at least 0' })
        .max(5, { message: 'Rating must be at most 5' })
        .refine(val => !(val % 0.5), {
          message:
            'Rating must be in increments of 0.5 (e.g., 0, 0.5, 1, ..., 5)',
        }),
      review: z.string().trim().min(1, { message: 'Review cannot be empty' }),
    }),
  }),
};
