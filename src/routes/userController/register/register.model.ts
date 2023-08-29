import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Incorrect email format',
      })
      .email(),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters long'),
  }),
});

export type RegisterModel = z.infer<typeof registerSchema>;
