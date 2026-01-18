import { OrganizationPrismaClient } from '../database/prisma';
import { PrismaBusinessUnitRepository } from '../repositories/business-unit/business-unit.repository.impl';
import { PrismaOrganizationRepository } from '../repositories/organization/organization.repository.impl';
import { PrismaOrganizationUnitOfWork } from '../repositories/organization-unit-of-work/organization-unit-of-work.impl';
import { PrismaOrganizationVerticalRepository } from '../repositories/organization-vertical/organization-vertical.repository.impl';
import { PrismaBusinessUnitVerticalRepository } from '../repositories/business-unit-vertical/business-unit-vertical.repository.impl';
import { PrismaUserOrganizationLinkRepository } from '../repositories/user-organization-link/user-organization-link.repository.impl';
import { PrismaUserRepository } from '../repositories/user/user.repository.impl';
import { PrismaVerticalRepository } from '../repositories/vertical/vertical.repository.impl';

export function createOrganizationRepositories(db: OrganizationPrismaClient) {
  return {
    organizationRepository: new PrismaOrganizationRepository(db),
    organizationVerticalRepository: new PrismaOrganizationVerticalRepository(db),
    businessUnitVerticalRepository: new PrismaBusinessUnitVerticalRepository(db),
    userRepository: new PrismaUserRepository(db),
    userOrganizationLinkRepository: new PrismaUserOrganizationLinkRepository(db),
    verticalRepository: new PrismaVerticalRepository(db),
    businessUnitRepository: new PrismaBusinessUnitRepository(db),
    unitOfWork: new PrismaOrganizationUnitOfWork(db),
  };
}
