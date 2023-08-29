import { z } from 'zod';

export const deleteSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters long'),
  }),
});

export type DeleteModel = z.infer<typeof deleteSchema>;
