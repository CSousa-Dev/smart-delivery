import { OrganizationDbClient } from '../../database/prisma';
import { BusinessUnit } from '../../../domain/entities/business-unit.entity';
import { BusinessUnitRepository } from '../../../domain/repositories/business-unit.repository';
import { BusinessUnitMapper } from './business-unit.mapper';

export class PrismaBusinessUnitRepository implements BusinessUnitRepository {
  constructor(private readonly prisma: OrganizationDbClient) {}

  async save(unit: BusinessUnit): Promise<void> {
    await this.prisma.businessUnit.create({
      data: BusinessUnitMapper.toPersistence(unit),
    });
  }

  async countByOrganizationId(organizationId: string): Promise<number> {
    return this.prisma.businessUnit.count({
      where: { organizationId },
    });
  }

  async listByOrganizationId(organizationId: string): Promise<BusinessUnit[]> {
    const units = await this.prisma.businessUnit.findMany({
      where: { organizationId },
      include: { address: true },
      orderBy: { createdAt: 'desc' },
    });

    return units.map((unit: any) =>
      BusinessUnit.create({
        id: unit.id,
        organizationId: unit.organizationId,
        publicName: unit.publicName,
        phoneNumber: unit.phoneNumber,
        phoneHasWhatsapp: unit.phoneHasWhatsapp,
        email: unit.email,
        instagram: unit.instagram,
        website: unit.website,
        address: {
          street: unit.address?.street ?? '',
          number: unit.address?.number ?? '',
          complement: unit.address?.complement ?? null,
          neighborhood: unit.address?.neighborhood ?? '',
          city: unit.address?.city ?? '',
          state: unit.address?.state ?? '',
          postalCode: unit.address?.postalCode ?? '',
          country: unit.address?.country ?? '',
          referencePoint: unit.address?.referencePoint ?? '',
        },
        status: unit.statusId as 'PENDING_PRODUCTS' | 'ACTIVE',
        createdAt: unit.createdAt,
        updatedAt: unit.updatedAt,
      })
    );
  }

  async findById(id: string): Promise<BusinessUnit | null> {
    const unit = await this.prisma.businessUnit.findUnique({
      where: { id },
      include: { address: true },
    });

    if (!unit) {
      return null;
    }

    return BusinessUnit.create({
      id: unit.id,
      organizationId: unit.organizationId,
      publicName: unit.publicName,
      phoneNumber: unit.phoneNumber,
      phoneHasWhatsapp: unit.phoneHasWhatsapp,
      email: unit.email,
      instagram: unit.instagram,
      website: unit.website,
      address: {
        street: unit.address?.street ?? '',
        number: unit.address?.number ?? '',
        complement: unit.address?.complement ?? null,
        neighborhood: unit.address?.neighborhood ?? '',
        city: unit.address?.city ?? '',
        state: unit.address?.state ?? '',
        postalCode: unit.address?.postalCode ?? '',
        country: unit.address?.country ?? '',
        referencePoint: unit.address?.referencePoint ?? '',
      },
      status: unit.statusId as 'PENDING_PRODUCTS' | 'ACTIVE',
      createdAt: unit.createdAt,
      updatedAt: unit.updatedAt,
    });
  }

  async list(
    page: number,
    pageSize: number,
    sortDirection: 'asc' | 'desc'
  ): Promise<BusinessUnit[]> {
    const units = await this.prisma.businessUnit.findMany({
      orderBy: { createdAt: sortDirection },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { address: true },
    });

    return units.map((unit: any) =>
      BusinessUnit.create({
        id: unit.id,
        organizationId: unit.organizationId,
        publicName: unit.publicName,
        phoneNumber: unit.phoneNumber,
        phoneHasWhatsapp: unit.phoneHasWhatsapp,
        email: unit.email,
        instagram: unit.instagram,
        website: unit.website,
        address: {
          street: unit.address?.street ?? '',
          number: unit.address?.number ?? '',
          complement: unit.address?.complement ?? null,
          neighborhood: unit.address?.neighborhood ?? '',
          city: unit.address?.city ?? '',
          state: unit.address?.state ?? '',
          postalCode: unit.address?.postalCode ?? '',
          country: unit.address?.country ?? '',
          referencePoint: unit.address?.referencePoint ?? '',
        },
        status: unit.statusId as 'PENDING_PRODUCTS' | 'ACTIVE',
        createdAt: unit.createdAt,
        updatedAt: unit.updatedAt,
      })
    );
  }

  async countAll(): Promise<number> {
    return this.prisma.businessUnit.count();
  }
}
