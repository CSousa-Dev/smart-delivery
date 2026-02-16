import { OrganizationDbClient } from '../../database/prisma';
import {
  OrganizationRepository,
  UpdateOrganizationData,
} from '../../../domain/repositories/organization.repository';
import { Organization } from '../../../domain/entities/organization.entity';
import { OrganizationMapper } from './organization.mapper';

type OrganizationRecord = {
  id: string;
  tradeName: string;
  legalName: string | null;
  documentType: string;
  documentNumber: string;
  statusId: string;
  ownerUserId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
};

export class PrismaOrganizationRepository implements OrganizationRepository {
  constructor(private readonly prisma: OrganizationDbClient) {}

  async save(organization: Organization): Promise<void> {
    await this.prisma.organization.create({
      data: OrganizationMapper.toPersistence(organization),
    });
  }

  async existsById(id: string): Promise<boolean> {
    const count = await this.prisma.organization.count({
      where: { id },
    });

    return count > 0;
  }

  async existsByDocumentNumber(documentNumber: string): Promise<boolean> {
    const count = await this.prisma.organization.count({
      where: { documentNumber },
    });

    return count > 0;
  }

  async findById(id: string): Promise<Organization | null> {
    const found = (await this.prisma.organization.findUnique({
      where: { id },
    })) as OrganizationRecord | null;

    if (!found) {
      return null;
    }

    return Organization.create({
      id: found.id,
      tradeName: found.tradeName,
      legalName: found.legalName,
      documentType: found.documentType,
      documentNumber: found.documentNumber,
      ownerUserId: found.ownerUserId,
      verticalCodes: [],
      status: found.statusId as 'PENDING_BUSINESS_UNIT' | 'ACTIVE',
      createdAt: found.createdAt,
      updatedAt: found.updatedAt,
    });
  }

  async update(id: string, data: UpdateOrganizationData): Promise<void> {
    const updateData: Record<string, unknown> = {};
    if (data.tradeName !== undefined) updateData.tradeName = data.tradeName;
    if (data.legalName !== undefined) updateData.legalName = data.legalName;
    if (Object.keys(updateData).length === 0) return;

    await this.prisma.organization.update({
      where: { id },
      data: updateData,
    });
  }

  async updateStatus(id: string, status: string): Promise<void> {
    await this.prisma.organization.update({
      where: { id },
      data: { statusId: status },
    });
  }

  async list(
    page: number,
    pageSize: number,
    sortDirection: 'asc' | 'desc'
  ): Promise<Organization[]> {
    const organizations = (await this.prisma.organization.findMany({
      orderBy: { createdAt: sortDirection },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })) as OrganizationRecord[];

    return organizations.map((organization) =>
      Organization.create({
        id: organization.id,
        tradeName: organization.tradeName,
        legalName: organization.legalName,
        documentType: organization.documentType,
        documentNumber: organization.documentNumber,
        ownerUserId: organization.ownerUserId,
        verticalCodes: [],
        status: organization.statusId as 'PENDING_BUSINESS_UNIT' | 'ACTIVE',
        createdAt: organization.createdAt,
        updatedAt: organization.updatedAt,
      })
    );
  }

  async countAll(): Promise<number> {
    return this.prisma.organization.count();
  }
}
