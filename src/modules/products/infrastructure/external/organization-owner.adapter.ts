import { OrganizationRepository } from '../../domain/ports/organization.repository';
import { OrganizationDbClient } from '../../../organization/infrastructure/database/prisma';

export class OrganizationOwnerAdapter implements OrganizationRepository {
  constructor(private readonly prisma: OrganizationDbClient) {}

  async findById(id: string): Promise<{ id: string; ownerUserId: string } | null> {
    const organization = await this.prisma.organization.findUnique({
      where: { id },
      select: { id: true, ownerUserId: true },
    });

    if (!organization) {
      return null;
    }

    return {
      id: organization.id,
      ownerUserId: organization.ownerUserId,
    };
  }
}
