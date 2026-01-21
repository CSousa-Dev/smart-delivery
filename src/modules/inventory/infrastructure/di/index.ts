import { createInventoryPrismaClient } from '../database/prisma';
import { createProductsPrismaClient } from '../../../products/infrastructure/database/prisma';
import { createOrganizationPrismaClient } from '../../../organization/infrastructure/database/prisma';
import { createInventoryRepositories } from './repositories';
import { createInventoryAdapters } from './adapters';
import { createInventoryDomainServices, createInventoryAppServices } from './services';
import { createInventoryControllers } from './controllers';
import { createInventoryHttpRouter } from '../../presentation/http/routes';

export function bootstrapInventoryModule() {
  const prisma = createInventoryPrismaClient();
  const productsPrisma = createProductsPrismaClient();
  const organizationPrisma = createOrganizationPrismaClient();
  const repos = createInventoryRepositories(prisma);
  const adapters = createInventoryAdapters({ productsPrisma, organizationPrisma });
  const domainServices = createInventoryDomainServices();
  const appServices = createInventoryAppServices(repos, adapters, domainServices);
  const controllers = createInventoryControllers(appServices);
  const router = createInventoryHttpRouter(controllers);

  return {
    prisma,
    productsPrisma,
    organizationPrisma,
    repos,
    adapters,
    domainServices,
    appServices,
    controllers,
    router,
  };
}
