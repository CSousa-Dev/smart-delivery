import { PrismaClient } from '@prisma/client';

export function createAttributesTestPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL_ATTRIBUTES_TEST;
  if (!url) {
    throw new Error('DATABASE_URL_ATTRIBUTES_TEST is not set');
  }

  return new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  });
}
