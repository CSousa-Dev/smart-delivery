import { createAttributesPrismaClient } from '../database/prisma';
import { createAttributesRepositories } from './repositories';
import { createAttributesDomainServices, createAttributesAppServices } from './services';
import { createAttributesAdapters } from './adapters';
import { createAttributesControllers } from './controllers';
import { createAttributesHttpRouter } from '../../presentation/http/routes';

export function bootstrapAttributesModule() {
  const prisma = createAttributesPrismaClient();
  const repos = createAttributesRepositories(prisma);
  const adapters = createAttributesAdapters();
  const domainServices = createAttributesDomainServices();
  const appServices = createAttributesAppServices(repos, domainServices, adapters);
  const controllers = createAttributesControllers(appServices);
  const router = createAttributesHttpRouter(controllers);

  return {
    prisma,
    repos,
    adapters,
    domainServices,
    appServices,
    controllers,
    router,
  };
}
