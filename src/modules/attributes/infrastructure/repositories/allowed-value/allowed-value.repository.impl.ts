import { PrismaClient } from '@prisma/client';
import { AllowedValueRepository } from '../../../domain/repositories/allowed-value.repository';
import { AllowedValue } from '../../../domain/entities/allowed-value.entity';
import { AllowedValueMapper } from './allowed-value.mapper';

export class PrismaAllowedValueRepository implements AllowedValueRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async saveAll(values: AllowedValue[]): Promise<void> {
    if (values.length === 0) {
      return;
    }

    await this.prisma.attributeAllowedValue.createMany({
      data: values.map(AllowedValueMapper.toPersistence),
    });
  }

  async existsByName(attributeId: string, name: string): Promise<boolean> {
    const count = await this.prisma.attributeAllowedValue.count({
      where: {
        attributeId,
        nameNormalized: name.trim().toLowerCase(),
      },
    });

    return count > 0;
  }

  async existsByValue(attributeId: string, value: string): Promise<boolean> {
    const count = await this.prisma.attributeAllowedValue.count({
      where: {
        attributeId,
        valueNormalized: value.trim().toLowerCase(),
      },
    });

    return count > 0;
  }

  async existsByNameExcludingId(
    attributeId: string,
    name: string,
    excludeId: string
  ): Promise<boolean> {
    const count = await this.prisma.attributeAllowedValue.count({
      where: {
        attributeId,
        nameNormalized: name.trim().toLowerCase(),
        id: { not: excludeId },
      },
    });

    return count > 0;
  }

  async existsByValueExcludingId(
    attributeId: string,
    value: string,
    excludeId: string
  ): Promise<boolean> {
    const count = await this.prisma.attributeAllowedValue.count({
      where: {
        attributeId,
        valueNormalized: value.trim().toLowerCase(),
        id: { not: excludeId },
      },
    });

    return count > 0;
  }

  async findById(id: string): Promise<AllowedValue | null> {
    const found = await this.prisma.attributeAllowedValue.findUnique({
      where: { id },
    });

    if (!found) {
      return null;
    }

    return AllowedValue.restore({
      id: found.id,
      attributeId: found.attributeId,
      name: found.name,
      value: found.value,
      description: found.description,
      createdAt: found.createdAt,
      updatedAt: found.updatedAt,
    });
  }

  async update(value: AllowedValue): Promise<void> {
    const { id, createdAt, ...data } = AllowedValueMapper.toPersistence(value);
    await this.prisma.attributeAllowedValue.update({
      where: { id: value.getId().value },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.attributeAllowedValue.delete({
      where: { id },
    });
  }

  async isLinkedToUsage(id: string): Promise<boolean> {
    const [verticalCount, categoryCount] = await this.prisma.$transaction([
      this.prisma.verticalAllowedValueLink.count({
        where: { attributeAllowedValueId: id },
      }),
      this.prisma.categoryAllowedValueLink.count({
        where: { sourceScope: 'ATTRIBUTE', sourceValueId: id },
      }),
    ]);

    return verticalCount > 0 || categoryCount > 0;
  }

  async listByAttribute(
    attributeId: string
  ): Promise<Array<{ id: string; name: string; value: string; description: string | null }>> {
    const values = await this.prisma.attributeAllowedValue.findMany({
      where: { attributeId },
      select: {
        id: true,
        name: true,
        value: true,
        description: true,
      },
    });

    return values;
  }
}
