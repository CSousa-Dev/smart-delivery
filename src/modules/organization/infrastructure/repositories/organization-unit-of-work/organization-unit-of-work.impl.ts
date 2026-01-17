import { OrganizationPrismaClient } from '../../database/prisma';
import {
  OrganizationUnitOfWork,
  OrganizationUnitOfWorkRepositories,
} from '../../../domain/repositories/organization-unit-of-work';
import { PrismaBusinessUnitRepository } from '../business-unit/business-unit.repository.impl';
import { PrismaOrganizationRepository } from '../organization/organization.repository.impl';
import { PrismaOrganizationVerticalRepository } from '../organization-vertical/organization-vertical.repository.impl';
import { PrismaUserRepository } from '../user/user.repository.impl';
import { PrismaUserOrganizationLinkRepository } from '../user-organization-link/user-organization-link.repository.impl';

export class PrismaOrganizationUnitOfWork implements OrganizationUnitOfWork {
  constructor(private readonly prisma: OrganizationPrismaClient) {}

  async withTransaction<T>(
    operation: (repositories: OrganizationUnitOfWorkRepositories) => Promise<T>
  ): Promise<T> {
    return this.prisma.$transaction(async (tx) => {
      const repositories: OrganizationUnitOfWorkRepositories = {
        businessUnitRepository: new PrismaBusinessUnitRepository(tx),
        organizationRepository: new PrismaOrganizationRepository(tx),
        organizationVerticalRepository: new PrismaOrganizationVerticalRepository(tx),
        userRepository: new PrismaUserRepository(tx),
        userOrganizationLinkRepository: new PrismaUserOrganizationLinkRepository(tx),
      };

      return operation(repositories);
    });
  }
}
