import { createAttributesPrismaClient } from '../database/prisma';
import { createAttributesRepositories } from './repositories';
import { createAttributesDomainServices, createAttributesAppServices } from './services';
import { createAttributesControllers } from './controllers';
import { createAttributesHttpRouter } from '../../presentation/http/routes';

export function bootstrapAttributesModule() {
  const prisma = createAttributesPrismaClient();
  const repos = createAttributesRepositories(prisma);
  const domainServices = createAttributesDomainServices();
  const appServices = createAttributesAppServices(repos, domainServices);
  const controllers = createAttributesControllers(appServices);
  const router = createAttributesHttpRouter(controllers);

  return {
    prisma,
    repos,
    domainServices,
    appServices,
    controllers,
    router,
  };
}
