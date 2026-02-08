import { PrismaClient, Prisma } from './generated';

export type CartPrismaClient = PrismaClient;
export type CartDbClient = CartPrismaClient | Prisma.TransactionClient;

export function createCartPrismaClient(): CartPrismaClient {
  const url = process.env.DATABASE_URL_CART;
  if (!url) {
    throw new Error('DATABASE_URL_CART is not set');
  }

  return new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  });
}
