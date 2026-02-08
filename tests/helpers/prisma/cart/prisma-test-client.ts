import { PrismaClient } from '../../../../src/modules/cart/infrastructure/database/prisma/generated';

export function createCartTestPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL_CART_TEST;
  if (!url) {
    throw new Error('DATABASE_URL_CART_TEST is not set');
  }

  return new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  });
}
