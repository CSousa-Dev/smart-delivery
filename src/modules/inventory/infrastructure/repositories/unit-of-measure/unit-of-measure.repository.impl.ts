import { PrismaClient } from '@prisma/client';
import { UnitOfMeasureRepository } from '../../../domain/repositories/unit-of-measure.repository';
import { UnitOfMeasure } from '../../../domain/entities/unit-of-measure.entity';
import { UnitOfMeasureMapper } from './unit-of-measure.mapper';

export class PrismaUnitOfMeasureRepository implements UnitOfMeasureRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async existsByCode(organizationId: string, codeNormalized: string): Promise<boolean> {
    const prisma = this.prisma as any;
    const count = await prisma.unitOfMeasure.count({
      where: { organizationId, codeNormalized },
    });

    return count > 0;
  }

  async existsByName(organizationId: string, nameNormalized: string): Promise<boolean> {
    const prisma = this.prisma as any;
    const count = await prisma.unitOfMeasure.count({
      where: { organizationId, nameNormalized },
    });

    return count > 0;
  }

  async findById(id: string): Promise<{
    id: string;
    organizationId: string;
    code: string;
    name: string;
    nameNormalized: string;
    symbol: string;
    allowsFraction: boolean;
    status: string;
    createdBy: string;
    createdAt: Date;
    updatedBy: string | null;
    updatedAt: Date | null;
  } | null> {
    const prisma = this.prisma as any;
    const unit = await prisma.unitOfMeasure.findUnique({
      where: { id },
      select: {
        id: true,
        organizationId: true,
        code: true,
        name: true,
        nameNormalized: true,
        symbol: true,
        allowsFraction: true,
        status: true,
        createdBy: true,
        createdAt: true,
        updatedBy: true,
        updatedAt: true,
      },
    });

    if (!unit) {
      return null;
    }

    return {
      id: unit.id,
      organizationId: unit.organizationId,
      code: unit.code,
      name: unit.name,
      nameNormalized: unit.nameNormalized,
      symbol: unit.symbol,
      allowsFraction: unit.allowsFraction,
      status: unit.status,
      createdBy: unit.createdBy,
      createdAt: unit.createdAt,
      updatedBy: unit.updatedBy,
      updatedAt: unit.updatedAt,
    };
  }

  async save(unit: UnitOfMeasure): Promise<void> {
    const prisma = this.prisma as any;
    const existing = await prisma.unitOfMeasure.findUnique({
      where: { id: unit.getId().value },
      select: { id: true },
    });

    if (!existing) {
      await prisma.unitOfMeasure.create({
        data: UnitOfMeasureMapper.toPersistence(unit),
      });
      return;
    }

    await prisma.unitOfMeasure.update({
      where: { id: unit.getId().value },
      data: {
        name: unit.getName(),
        nameNormalized: unit.getNameNormalized(),
        status: unit.getStatus(),
        updatedBy: unit.getUpdatedBy(),
        updatedAt: unit.getUpdatedAt(),
      },
    });
  }
}
