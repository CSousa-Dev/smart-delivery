import { PrismaClient } from '@prisma/client';

export function createInventoryPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL_INVENTORY;
  if (!url) {
    throw new Error('DATABASE_URL_INVENTORY is not set');
  }

  return new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  });
}
