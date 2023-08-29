import { PrismaClient } from '@prisma/client';

let prismaClient: PrismaClient | undefined;

export const createDbClient = (): PrismaClient => {
  if (!prismaClient) {
    prismaClient = new PrismaClient();
  }
  return prismaClient;
};
