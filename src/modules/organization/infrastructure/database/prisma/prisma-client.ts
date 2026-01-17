import { PrismaClient, Prisma } from './generated';

export type OrganizationPrismaClient = PrismaClient;
export type OrganizationDbClient = OrganizationPrismaClient | Prisma.TransactionClient;

export function createOrganizationPrismaClient(): OrganizationPrismaClient {
  const url = process.env.DATABASE_URL_ORGANIZATION;
  if (!url) {
    throw new Error('DATABASE_URL_ORGANIZATION is not set');
  }

  return new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  });
}
