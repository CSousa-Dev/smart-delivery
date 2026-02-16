import { OrganizationDbClient } from '../../database/prisma';
import { BusinessUnitVerticalRepository } from '../../../domain/repositories/business-unit-vertical.repository';
import { BusinessUnitVerticalLink } from '../../../domain/entities/business-unit-vertical-link.entity';
import { BusinessUnitVerticalMapper } from './business-unit-vertical.mapper';
import { VerticalLinkStatusValue } from '../../../domain/entities/vertical-link-status';

export class PrismaBusinessUnitVerticalRepository implements BusinessUnitVerticalRepository {
  constructor(private readonly prisma: OrganizationDbClient) {}

  async saveMany(links: BusinessUnitVerticalLink[]): Promise<void> {
    if (links.length === 0) {
      return;
    }

    await this.prisma.businessUnitVertical.createMany({
      data: links.map((link) => BusinessUnitVerticalMapper.toPersistence(link)),
    });
  }

  async save(link: BusinessUnitVerticalLink): Promise<void> {
    await this.prisma.businessUnitVertical.create({
      data: BusinessUnitVerticalMapper.toPersistence(link),
    });
  }

  async listByBusinessUnitId(businessUnitId: string): Promise<BusinessUnitVerticalLink[]> {
    const links = await this.prisma.businessUnitVertical.findMany({
      where: { businessUnitId },
      orderBy: { createdAt: 'desc' },
    });

    return links.map((link) => BusinessUnitVerticalMapper.toDomain(link));
  }

  async findByBusinessUnitAndVerticalCode(
    businessUnitId: string,
    verticalCode: string
  ): Promise<BusinessUnitVerticalLink | null> {
    const link = await this.prisma.businessUnitVertical.findUnique({
      where: { businessUnitId_verticalCode: { businessUnitId, verticalCode } },
    });

    return link ? BusinessUnitVerticalMapper.toDomain(link) : null;
  }

  async findActiveByBusinessUnitAndVerticalCode(
    businessUnitId: string,
    verticalCode: string
  ): Promise<BusinessUnitVerticalLink | null> {
    const link = await this.prisma.businessUnitVertical.findFirst({
      where: { businessUnitId, verticalCode, statusId: 'ACTIVE' },
    });

    return link ? BusinessUnitVerticalMapper.toDomain(link) : null;
  }

  async updateStatus(
    businessUnitId: string,
    verticalCode: string,
    status: VerticalLinkStatusValue
  ): Promise<void> {
    await this.prisma.businessUnitVertical.update({
      where: { businessUnitId_verticalCode: { businessUnitId, verticalCode } },
      data: { statusId: status, updatedAt: new Date() },
    });
  }

  async countActiveByBusinessUnitId(businessUnitId: string): Promise<number> {
    return this.prisma.businessUnitVertical.count({
      where: { businessUnitId, statusId: 'ACTIVE' },
    });
  }
}
