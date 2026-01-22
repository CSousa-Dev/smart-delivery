import { createInventoryPrismaClient } from '../database/prisma';
import { createOrganizationPrismaClient } from '../../../organization/infrastructure/database/prisma';
import { createInventoryRepositories } from './repositories';
import { createInventoryAdapters } from './adapters';
import { createInventoryDomainServices, createInventoryAppServices } from './services';
import { createInventoryControllers } from './controllers';
import { createInventoryHttpRouter } from '../../presentation/http/routes';

export function bootstrapInventoryModule() {
  const prisma = createInventoryPrismaClient();
  const organizationPrisma = createOrganizationPrismaClient();
  const repos = createInventoryRepositories(prisma);
  const adapters = createInventoryAdapters({ organizationPrisma });
  const domainServices = createInventoryDomainServices();
  const appServices = createInventoryAppServices(repos, adapters, domainServices);
  const controllers = createInventoryControllers(appServices);
  const router = createInventoryHttpRouter(controllers);

  return {
    prisma,
    organizationPrisma,
    repos,
    adapters,
    domainServices,
    appServices,
    controllers,
    router,
  };
}
