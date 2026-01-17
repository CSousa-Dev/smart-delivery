import { BusinessUnitController } from '../../presentation/http/controllers/business-unit.controller';
import { OrganizationController } from '../../presentation/http/controllers/organization.controller';
import { UserController } from '../../presentation/http/controllers/user.controller';
import { createOrganizationAppServices } from './services';

type AppServices = ReturnType<typeof createOrganizationAppServices>;

export function createOrganizationControllers(services: AppServices) {
  return {
    userController: new UserController(
      services.createUserService,
      services.getUserService,
      services.listUsersService
    ),
    organizationController: new OrganizationController(
      services.createOrganizationService,
      services.getOrganizationService,
      services.listOrganizationsService
    ),
    businessUnitController: new BusinessUnitController(
      services.createBusinessUnitService,
      services.getBusinessUnitService,
      services.listBusinessUnitsService
    ),
  };
}
