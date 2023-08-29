import { z } from 'zod';

export const updateSchema = z.object({
  body: z
    .object({
      name: z.string(),
      email: z.string().email('Incorrect email format'),
    })
    .partial()
    .refine(
      (data) => !!data.name || !!data.email,
      'Either name or email is required.'
    ),
});

export type UpdateModel = z.infer<typeof updateSchema>;
