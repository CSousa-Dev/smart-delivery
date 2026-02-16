import { BusinessUnitController } from '../../presentation/http/controllers/business-unit.controller';
import { BusinessUnitVerticalController } from '../../presentation/http/controllers/business-unit-vertical.controller';
import { OrganizationController } from '../../presentation/http/controllers/organization.controller';
import { OrganizationVerticalController } from '../../presentation/http/controllers/organization-vertical.controller';
import { UserController } from '../../presentation/http/controllers/user.controller';
import { VerticalController } from '../../presentation/http/controllers/vertical.controller';
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
      services.listOrganizationsService,
      services.updateOrganizationService
    ),
    businessUnitController: new BusinessUnitController(
      services.createBusinessUnitService,
      services.getBusinessUnitService,
      services.listBusinessUnitsService
    ),
    organizationVerticalController: new OrganizationVerticalController(
      services.linkOrganizationVerticalService,
      services.unlinkOrganizationVerticalService,
      services.listOrganizationVerticalsService
    ),
    businessUnitVerticalController: new BusinessUnitVerticalController(
      services.linkBusinessUnitVerticalService,
      services.unlinkBusinessUnitVerticalService,
      services.listBusinessUnitVerticalsService
    ),
    verticalController: new VerticalController(services.listVerticalsService),
  };
}
