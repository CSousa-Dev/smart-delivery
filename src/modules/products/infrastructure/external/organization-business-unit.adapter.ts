import { BusinessUnitRepository } from '../../domain/ports/business-unit.repository';
import { OrganizationDbClient } from '../../../organization/infrastructure/database/prisma';

export class OrganizationBusinessUnitAdapter implements BusinessUnitRepository {
  constructor(private readonly prisma: OrganizationDbClient) {}

  async findById(id: string): Promise<{
    id: string;
    organizationId: string;
    enabledVerticalIds: string[];
  } | null> {
    const businessUnit = await this.prisma.businessUnit.findUnique({
      where: { id },
      select: { id: true, organizationId: true },
    });

    if (!businessUnit) {
      return null;
    }

    const verticals = await this.prisma.organizationVertical.findMany({
      where: { organizationId: businessUnit.organizationId },
      select: { verticalId: true },
    });

    return {
      id: businessUnit.id,
      organizationId: businessUnit.organizationId,
      enabledVerticalIds: verticals.map((vertical) => vertical.verticalId),
    };
  }
}
