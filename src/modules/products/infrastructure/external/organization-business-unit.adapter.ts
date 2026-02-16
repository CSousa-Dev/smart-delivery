import { BusinessUnitRepository } from '../../domain/ports/business-unit.repository';
import { OrganizationDbClient } from '../../../organization/infrastructure/database/prisma';

export class OrganizationBusinessUnitAdapter implements BusinessUnitRepository {
  constructor(private readonly prisma: OrganizationDbClient) {}

  async findById(id: string): Promise<{
    id: string;
    organizationId: string;
    activeVerticalCodes: string[];
  } | null> {
    const businessUnit = await this.prisma.businessUnit.findUnique({
      where: { id },
      select: { id: true, organizationId: true },
    });

    if (!businessUnit) {
      return null;
    }

    const verticals = await this.prisma.businessUnitVertical.findMany({
      where: { businessUnitId: businessUnit.id, statusId: 'ACTIVE' },
      select: { verticalCode: true },
    });

    return {
      id: businessUnit.id,
      organizationId: businessUnit.organizationId,
      activeVerticalCodes: verticals.map((v) => v.verticalCode),
    };
  }
}
