import { CreateBusinessUnitService } from '../../application/services/create-business-unit.service';
import { CreateOrganizationService } from '../../application/services/create-organization.service';
import { CreateUserService } from '../../application/services/create-user.service';
import { GetBusinessUnitService } from '../../application/services/get-business-unit.service';
import { GetOrganizationService } from '../../application/services/get-organization.service';
import { GetUserService } from '../../application/services/get-user.service';
import { ListBusinessUnitsService } from '../../application/services/list-business-units.service';
import { ListOrganizationsService } from '../../application/services/list-organizations.service';
import { ListUsersService } from '../../application/services/list-users.service';
import { createOrganizationRepositories } from './repositories';

type Repositories = ReturnType<typeof createOrganizationRepositories>;

export function createOrganizationAppServices(repos: Repositories) {
  return {
    createUserService: new CreateUserService(
      repos.userRepository,
      repos.organizationRepository,
      repos.unitOfWork
    ),
    createOrganizationService: new CreateOrganizationService(
      repos.organizationRepository,
      repos.userRepository,
      repos.userOrganizationLinkRepository,
      repos.verticalRepository,
      repos.unitOfWork
    ),
    createBusinessUnitService: new CreateBusinessUnitService(
      repos.businessUnitRepository,
      repos.organizationRepository,
      repos.unitOfWork
    ),
    getUserService: new GetUserService(
      repos.userRepository,
      repos.userOrganizationLinkRepository
    ),
    listUsersService: new ListUsersService(
      repos.userRepository,
      repos.userOrganizationLinkRepository
    ),
    getOrganizationService: new GetOrganizationService(
      repos.organizationRepository,
      repos.organizationVerticalRepository,
      repos.businessUnitRepository,
      repos.userRepository
    ),
    listOrganizationsService: new ListOrganizationsService(
      repos.organizationRepository,
      repos.organizationVerticalRepository
    ),
    getBusinessUnitService: new GetBusinessUnitService(repos.businessUnitRepository),
    listBusinessUnitsService: new ListBusinessUnitsService(repos.businessUnitRepository),
  };
}
