import { z } from 'zod';

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z
      .string({
        required_error: 'Current password is required',
      })
      .min(6, 'Current password must be at least 6 characters long'),
    newPassword: z
      .string({
        required_error: 'New password is required',
      })
      .min(6, 'New password must be at least 6 characters long'),
  }),
});

export type ChangePasswordModel = z.infer<typeof changePasswordSchema>;
