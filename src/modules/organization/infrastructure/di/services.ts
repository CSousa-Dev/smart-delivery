import { CreateBusinessUnitService } from '../../application/services/create-business-unit.service';
import { CreateOrganizationService } from '../../application/services/create-organization.service';
import { UpdateOrganizationService } from '../../application/services/update-organization.service';
import { CreateUserService } from '../../application/services/create-user.service';
import { GetBusinessUnitService } from '../../application/services/get-business-unit.service';
import { GetOrganizationService } from '../../application/services/get-organization.service';
import { GetUserService } from '../../application/services/get-user.service';
import { LinkBusinessUnitVerticalService } from '../../application/services/link-business-unit-vertical.service';
import { LinkOrganizationVerticalService } from '../../application/services/link-organization-vertical.service';
import { ListBusinessUnitsService } from '../../application/services/list-business-units.service';
import { ListBusinessUnitVerticalsService } from '../../application/services/list-business-unit-verticals.service';
import { ListOrganizationsService } from '../../application/services/list-organizations.service';
import { ListOrganizationVerticalsService } from '../../application/services/list-organization-verticals.service';
import { ListUsersService } from '../../application/services/list-users.service';
import { ListVerticalsService } from '../../application/services/list-verticals.service';
import { UnlinkBusinessUnitVerticalService } from '../../application/services/unlink-business-unit-vertical.service';
import { UnlinkOrganizationVerticalService } from '../../application/services/unlink-organization-vertical.service';
import { VerticalCatalogPort } from '../../application/ports/vertical-catalog.port';
import { createOrganizationRepositories } from './repositories';

type Repositories = ReturnType<typeof createOrganizationRepositories>;

export function createOrganizationAppServices(
  repos: Repositories,
  verticalCatalog: VerticalCatalogPort
) {
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
      repos.unitOfWork
    ),
    updateOrganizationService: new UpdateOrganizationService(
      repos.organizationRepository,
      repos.organizationVerticalRepository
    ),
    createBusinessUnitService: new CreateBusinessUnitService(
      repos.businessUnitRepository,
      repos.businessUnitVerticalRepository,
      repos.organizationRepository,
      repos.organizationVerticalRepository,
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
      repos.userRepository,
      verticalCatalog
    ),
    listOrganizationsService: new ListOrganizationsService(
      repos.organizationRepository,
      repos.organizationVerticalRepository,
      verticalCatalog
    ),
    getBusinessUnitService: new GetBusinessUnitService(
      repos.businessUnitRepository,
      repos.businessUnitVerticalRepository,
      verticalCatalog
    ),
    listBusinessUnitsService: new ListBusinessUnitsService(repos.businessUnitRepository),
    linkOrganizationVerticalService: new LinkOrganizationVerticalService(
      repos.organizationRepository,
      repos.organizationVerticalRepository,
      verticalCatalog
    ),
    unlinkOrganizationVerticalService: new UnlinkOrganizationVerticalService(
      repos.organizationRepository,
      repos.organizationVerticalRepository,
      repos.unitOfWork
    ),
    linkBusinessUnitVerticalService: new LinkBusinessUnitVerticalService(
      repos.businessUnitRepository,
      repos.businessUnitVerticalRepository,
      repos.organizationRepository,
      repos.organizationVerticalRepository
    ),
    unlinkBusinessUnitVerticalService: new UnlinkBusinessUnitVerticalService(
      repos.businessUnitRepository,
      repos.businessUnitVerticalRepository,
      repos.organizationRepository,
      repos.unitOfWork
    ),
    listOrganizationVerticalsService: new ListOrganizationVerticalsService(
      repos.organizationRepository,
      repos.organizationVerticalRepository,
      verticalCatalog
    ),
    listBusinessUnitVerticalsService: new ListBusinessUnitVerticalsService(
      repos.businessUnitRepository,
      repos.businessUnitVerticalRepository,
      verticalCatalog
    ),
    listVerticalsService: new ListVerticalsService(verticalCatalog),
  };
}
