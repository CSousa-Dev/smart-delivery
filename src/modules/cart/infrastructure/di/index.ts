import { createCartPrismaClient } from '../database/prisma';
import { createCartRepositories } from './repositories';
import { createCartAdapters } from './adapters';
import { createCartAppServices } from './services';
import { createCartControllers } from './controllers';
import { createCartHttpRouter } from '../../presentation/http/routes';
import { AuthenticateRequestService } from '../../../auth/application/service/authenticate-request.service';

export function bootstrapCartModule(deps: {
  authenticateRequestService: AuthenticateRequestService;
}) {
  const prisma = createCartPrismaClient();
  const repos = createCartRepositories(prisma);
  const adapters = createCartAdapters();
  const appServices = createCartAppServices(repos, adapters);
  const controllers = createCartControllers(appServices, deps.authenticateRequestService);
  const router = createCartHttpRouter(controllers);

  return {
    prisma,
    repos,
    adapters,
    appServices,
    controllers,
    router,
  };
}
