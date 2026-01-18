import { OrganizationDbClient } from '../../database/prisma';
import { OrganizationVerticalRepository } from '../../../domain/repositories/organization-vertical.repository';
import { OrganizationVerticalLink } from '../../../domain/entities/organization-vertical-link.entity';
import { OrganizationVerticalMapper } from './organization-vertical.mapper';
import { VerticalLinkStatusValue } from '../../../domain/entities/vertical-link-status';

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

  async save(link: OrganizationVerticalLink): Promise<void> {
    await this.prisma.organizationVertical.create({
      data: OrganizationVerticalMapper.toPersistence(link),
    });
  }

  async listByOrganizationId(organizationId: string): Promise<OrganizationVerticalLink[]> {
    const links = await this.prisma.organizationVertical.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });

    return links.map((link: {
      organizationId: string;
      verticalId: string;
      statusId: string;
      createdAt: Date;
      updatedAt: Date | null;
    }) =>
      OrganizationVerticalLink.restore({
        organizationId: link.organizationId,
        verticalId: link.verticalId,
        status: link.statusId as VerticalLinkStatusValue,
        createdAt: link.createdAt,
        updatedAt: link.updatedAt,
      })
    );
  }

  async listActiveByOrganizationId(organizationId: string): Promise<OrganizationVerticalLink[]> {
    const links = await this.prisma.organizationVertical.findMany({
      where: { organizationId, statusId: 'ACTIVE' },
      orderBy: { createdAt: 'desc' },
    });

    return links.map((link: {
      organizationId: string;
      verticalId: string;
      statusId: string;
      createdAt: Date;
      updatedAt: Date | null;
    }) =>
      OrganizationVerticalLink.restore({
        organizationId: link.organizationId,
        verticalId: link.verticalId,
        status: link.statusId as VerticalLinkStatusValue,
        createdAt: link.createdAt,
        updatedAt: link.updatedAt,
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

    return links.map((link: {
      organizationId: string;
      verticalId: string;
      statusId: string;
      createdAt: Date;
      updatedAt: Date | null;
    }) =>
      OrganizationVerticalLink.restore({
        organizationId: link.organizationId,
        verticalId: link.verticalId,
        status: link.statusId as VerticalLinkStatusValue,
        createdAt: link.createdAt,
        updatedAt: link.updatedAt,
      })
    );
  }

  async findByOrganizationAndVerticalId(
    organizationId: string,
    verticalId: string
  ): Promise<OrganizationVerticalLink | null> {
    const link = await this.prisma.organizationVertical.findUnique({
      where: { organizationId_verticalId: { organizationId, verticalId } },
    });

    if (!link) {
      return null;
    }

    return OrganizationVerticalLink.restore({
      organizationId: link.organizationId,
      verticalId: link.verticalId,
      status: link.statusId as VerticalLinkStatusValue,
      createdAt: link.createdAt,
      updatedAt: link.updatedAt,
    });
  }

  async findActiveByOrganizationAndVerticalId(
    organizationId: string,
    verticalId: string
  ): Promise<OrganizationVerticalLink | null> {
    const link = await this.prisma.organizationVertical.findFirst({
      where: { organizationId, verticalId, statusId: 'ACTIVE' },
    });

    if (!link) {
      return null;
    }

    return OrganizationVerticalLink.restore({
      organizationId: link.organizationId,
      verticalId: link.verticalId,
      status: link.statusId as VerticalLinkStatusValue,
      createdAt: link.createdAt,
      updatedAt: link.updatedAt,
    });
  }

  async existsActiveByOrganizationAndVerticalId(
    organizationId: string,
    verticalId: string
  ): Promise<boolean> {
    const count = await this.prisma.organizationVertical.count({
      where: { organizationId, verticalId, statusId: 'ACTIVE' },
    });

    return count > 0;
  }

  async updateStatus(
    organizationId: string,
    verticalId: string,
    status: VerticalLinkStatusValue
  ): Promise<void> {
    await this.prisma.organizationVertical.update({
      where: { organizationId_verticalId: { organizationId, verticalId } },
      data: { statusId: status, updatedAt: new Date() },
    });
  }

  async countActiveByOrganizationId(organizationId: string): Promise<number> {
    return this.prisma.organizationVertical.count({
      where: { organizationId, statusId: 'ACTIVE' },
    });
  }
}
