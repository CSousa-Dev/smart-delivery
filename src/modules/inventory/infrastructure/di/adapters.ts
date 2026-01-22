import { OrganizationDbClient } from '../../../organization/infrastructure/database/prisma';
import { OrganizationRepositoryAdapter } from '../external/organization.repository.adapter';
import { OrganizationBusinessUnitAdapter } from '../external/organization-business-unit.adapter';

export function createInventoryAdapters(params: {
  organizationPrisma: OrganizationDbClient;
}) {
  const { organizationPrisma } = params;

  return {
    organizationRepository: new OrganizationRepositoryAdapter(organizationPrisma),
    businessUnitRepository: new OrganizationBusinessUnitAdapter(organizationPrisma),
  };
}
