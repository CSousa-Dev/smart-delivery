import { OrganizationRepository } from '../../domain/ports/organization.repository';
import { OrganizationDbClient } from '../../../organization/infrastructure/database/prisma';

export class OrganizationRepositoryAdapter implements OrganizationRepository {
  constructor(private readonly prisma: OrganizationDbClient) {}

  async existsById(id: string): Promise<boolean> {
    const organization = await this.prisma.organization.findUnique({
      where: { id },
      select: { id: true },
    });

    return Boolean(organization);
  }
}
