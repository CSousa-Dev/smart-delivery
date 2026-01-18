import { BusinessUnitRepository } from '../../domain/ports/business-unit.repository';
import { OrganizationDbClient } from '../../../organization/infrastructure/database/prisma';

export class OrganizationBusinessUnitAdapter implements BusinessUnitRepository {
  constructor(private readonly prisma: OrganizationDbClient) {}

  async existsById(id: string): Promise<boolean> {
    const businessUnit = await this.prisma.businessUnit.findUnique({
      where: { id },
      select: { id: true },
    });

    return Boolean(businessUnit);
  }

  async existsByIdAndOrganizationId(
    businessUnitId: string,
    organizationId: string
  ): Promise<boolean> {
    const businessUnit = await this.prisma.businessUnit.findFirst({
      where: { id: businessUnitId, organizationId },
      select: { id: true },
    });

    return Boolean(businessUnit);
  }
}
