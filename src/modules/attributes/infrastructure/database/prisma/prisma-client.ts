import { PrismaClient } from '@prisma/client';

export function createAttributesPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL_ATTRIBUTES;
  if (!url) {
    throw new Error('DATABASE_URL_ATTRIBUTES is not set');
  }

  return new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  });
}
