import { Router } from 'express';
import { createUsersRouter } from './users.routes';
import { createOrganizationsRouter } from './organizations.routes';
import { createBusinessUnitsRouter } from './business-units.routes';
import { createOrganizationVerticalsRouter } from './organization-verticals.routes';
import { createBusinessUnitVerticalsRouter } from './business-unit-verticals.routes';
import { createVerticalsRouter } from './verticals.routes';
import { UserController } from '../controllers/user.controller';
import { OrganizationController } from '../controllers/organization.controller';
import { BusinessUnitController } from '../controllers/business-unit.controller';
import { OrganizationVerticalController } from '../controllers/organization-vertical.controller';
import { BusinessUnitVerticalController } from '../controllers/business-unit-vertical.controller';
import { VerticalController } from '../controllers/vertical.controller';

export interface OrganizationControllers {
  userController: UserController;
  organizationController: OrganizationController;
  businessUnitController: BusinessUnitController;
  organizationVerticalController: OrganizationVerticalController;
  businessUnitVerticalController: BusinessUnitVerticalController;
  verticalController: VerticalController;
}

export function createOrganizationHttpRouter(controllers: OrganizationControllers): Router {
  const router = Router();

  router.use(createUsersRouter(controllers.userController));
  router.use(createOrganizationsRouter(controllers.organizationController));
  router.use(createBusinessUnitsRouter(controllers.businessUnitController));
  router.use(createOrganizationVerticalsRouter(controllers.organizationVerticalController));
  router.use(createBusinessUnitVerticalsRouter(controllers.businessUnitVerticalController));
  router.use(createVerticalsRouter(controllers.verticalController));

  return router;
}
