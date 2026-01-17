import { createOrganizationPrismaClient } from '../database/prisma';
import { createOrganizationRepositories } from './repositories';
import { createOrganizationAppServices } from './services';
import { createOrganizationControllers } from './controllers';
import { createOrganizationHttpRouter } from '../../presentation/http/routes';

export function bootstrapOrganizationModule() {
  const prisma = createOrganizationPrismaClient();
  const repos = createOrganizationRepositories(prisma);
  const appServices = createOrganizationAppServices(repos);
  const controllers = createOrganizationControllers(appServices);
  const router = createOrganizationHttpRouter(controllers);

  return {
    prisma,
    repos,
    appServices,
    controllers,
    router,
  };
}
