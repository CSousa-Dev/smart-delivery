import { BusinessUnitRepository } from './business-unit.repository';
import { BusinessUnitVerticalRepository } from './business-unit-vertical.repository';
import { OrganizationRepository } from './organization.repository';
import { OrganizationVerticalRepository } from './organization-vertical.repository';
import { UserRepository } from './user.repository';
import { UserOrganizationLinkRepository } from './user-organization-link.repository';

export interface OrganizationUnitOfWorkRepositories {
  businessUnitRepository: BusinessUnitRepository;
  businessUnitVerticalRepository: BusinessUnitVerticalRepository;
  organizationRepository: OrganizationRepository;
  organizationVerticalRepository: OrganizationVerticalRepository;
  userRepository: UserRepository;
  userOrganizationLinkRepository: UserOrganizationLinkRepository;
}

export interface OrganizationUnitOfWork {
  withTransaction<T>(
    operation: (repositories: OrganizationUnitOfWorkRepositories) => Promise<T>
  ): Promise<T>;
}
