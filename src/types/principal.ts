import type { User } from '@prisma/client';

export type Principal = Omit<User, 'password' | 'createdAt' | 'updatedAt'>;
