import { PrismaClient } from '@prisma/client';

export function createProductsTestPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL_PRODUCTS_TEST;
  if (!url) {
    throw new Error('DATABASE_URL_PRODUCTS_TEST is not set');
  }

  return new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  });
}
