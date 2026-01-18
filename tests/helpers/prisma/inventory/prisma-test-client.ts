import { PrismaClient } from '../../../../src/modules/inventory/infrastructure/database/prisma/generated';

export function createInventoryTestPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL_INVENTORY_TEST;
  if (!url) {
    throw new Error('DATABASE_URL_INVENTORY_TEST is not set');
  }

  return new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  });
}
