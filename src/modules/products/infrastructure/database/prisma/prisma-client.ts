import { PrismaClient } from '@prisma/client';

export function createProductsPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL_PRODUCTS;
  if (!url) {
    throw new Error('DATABASE_URL_PRODUCTS is not set');
  }

  return new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  });
}
