import { PrismaClient, Prisma } from './generated';

export type ProductsPrismaClient = PrismaClient;
export type ProductsDbClient = ProductsPrismaClient | Prisma.TransactionClient;

export function createProductsPrismaClient(): ProductsPrismaClient {
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
