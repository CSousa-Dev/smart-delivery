import { Router } from 'express';
import { createUsersRouter } from './users.routes';
import { createOrganizationsRouter } from './organizations.routes';
import { createBusinessUnitsRouter } from './business-units.routes';
import { UserController } from '../controllers/user.controller';
import { OrganizationController } from '../controllers/organization.controller';
import { BusinessUnitController } from '../controllers/business-unit.controller';

export interface OrganizationControllers {
  userController: UserController;
  organizationController: OrganizationController;
  businessUnitController: BusinessUnitController;
}

export function createOrganizationHttpRouter(controllers: OrganizationControllers): Router {
  const router = Router();

  router.use(createUsersRouter(controllers.userController));
  router.use(createOrganizationsRouter(controllers.organizationController));
  router.use(createBusinessUnitsRouter(controllers.businessUnitController));

  return router;
}
