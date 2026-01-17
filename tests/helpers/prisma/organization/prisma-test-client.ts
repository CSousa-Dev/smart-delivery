import { PrismaClient } from '../../../../src/modules/organization/infrastructure/database/prisma/generated';

export type OrganizationPrismaClient = PrismaClient;

export function createOrganizationTestPrismaClient(): OrganizationPrismaClient {
  const url = process.env.DATABASE_URL_ORGANIZATION_TEST;
  if (!url) {
    throw new Error('DATABASE_URL_ORGANIZATION_TEST is not set');
  }

  return new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  });
}
