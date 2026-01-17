import { OrganizationDbClient } from '../../database/prisma';
import { OrganizationVerticalRepository } from '../../../domain/repositories/organization-vertical.repository';
import { OrganizationVerticalLink } from '../../../domain/entities/organization-vertical-link.entity';
import { OrganizationVerticalMapper } from './organization-vertical.mapper';

export class PrismaOrganizationVerticalRepository implements OrganizationVerticalRepository {
  constructor(private readonly prisma: OrganizationDbClient) {}

  async saveMany(links: OrganizationVerticalLink[]): Promise<void> {
    if (links.length === 0) {
      return;
    }

    await this.prisma.organizationVertical.createMany({
      data: links.map((link) => OrganizationVerticalMapper.toPersistence(link)),
    });
  }

  async listByOrganizationId(organizationId: string): Promise<OrganizationVerticalLink[]> {
    const links = await this.prisma.organizationVertical.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });

    return links.map((link: { organizationId: string; verticalId: string; createdAt: Date }) =>
      OrganizationVerticalLink.restore({
        organizationId: link.organizationId,
        verticalId: link.verticalId,
        createdAt: link.createdAt,
      })
    );
  }

  async listByOrganizationIds(organizationIds: string[]): Promise<OrganizationVerticalLink[]> {
    if (!organizationIds.length) {
      return [];
    }

    const links = await this.prisma.organizationVertical.findMany({
      where: { organizationId: { in: organizationIds } },
      orderBy: { createdAt: 'desc' },
    });

    return links.map((link: { organizationId: string; verticalId: string; createdAt: Date }) =>
      OrganizationVerticalLink.restore({
        organizationId: link.organizationId,
        verticalId: link.verticalId,
        createdAt: link.createdAt,
      })
    );
  }
}
