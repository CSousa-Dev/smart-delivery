import { createOrganizationPrismaClient } from '../database/prisma';
import { createOrganizationRepositories } from './repositories';
import { createOrganizationAppServices } from './services';
import { createOrganizationControllers } from './controllers';
import { createOrganizationHttpRouter } from '../../presentation/http/routes';
import { AttributesVerticalCatalogAdapter } from '../adapters/attributes-vertical-catalog.adapter';
import { VerticalCatalogPort } from '../../application/ports/vertical-catalog.port';

export interface BootstrapOrganizationModuleDeps {
  /** List verticals from Attributes module; returns items with code, name, description, isActive. */
  listVerticalsFromCatalog: () => Promise<{
    items: Array<{ code: string; name: string; description: string; isActive: boolean }>;
  }>;
}

export function bootstrapOrganizationModule(deps: BootstrapOrganizationModuleDeps) {
  const prisma = createOrganizationPrismaClient();
  const repos = createOrganizationRepositories(prisma);
  const verticalCatalog: VerticalCatalogPort = new AttributesVerticalCatalogAdapter(
    deps.listVerticalsFromCatalog
  );
  const appServices = createOrganizationAppServices(repos, verticalCatalog);
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
