import { z } from 'zod';

const registerSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    /** Todo */
    // .regex(/[a-z]/, 'must contain at least one lowercase letter')
    // .regex(/[A-Z]/, 'must contain at least one uppercase letter')
    // .regex(/[0-9]/, 'must contain at least one number')
    // .regex(/[^a-zA-Z0-9]/, 'must contain at least one special character'),
    avatar: z
      .string()
      .regex(/^\/[^/].*$/, 'must be a valid path starting with /'),
  }),
});

export const UserValidation = {
  registerSchema,
};
