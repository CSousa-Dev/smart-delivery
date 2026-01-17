import { createProductsPrismaClient } from '../database/prisma';
import { createAttributesPrismaClient } from '../../../attributes/infrastructure/database/prisma';
import { createOrganizationPrismaClient } from '../../../organization/infrastructure/database/prisma';
import { createProductsRepositories } from './repositories';
import { createProductsAdapters } from './adapters';
import { createProductsAppServices } from './services';
import { createProductsControllers } from './controllers';
import { createProductsHttpRouter } from '../../presentation/http/routes';

export function bootstrapProductsModule() {
  const prisma = createProductsPrismaClient();
  const attributesPrisma = createAttributesPrismaClient();
  const organizationPrisma = createOrganizationPrismaClient();
  const repos = createProductsRepositories(prisma);
  const adapters = createProductsAdapters({ organizationPrisma, attributesPrisma });
  const appServices = createProductsAppServices(repos, adapters);
  const controllers = createProductsControllers(appServices);
  const router = createProductsHttpRouter(controllers);

  return {
    prisma,
    attributesPrisma,
    organizationPrisma,
    repos,
    adapters,
    appServices,
    controllers,
    router,
  };
}
