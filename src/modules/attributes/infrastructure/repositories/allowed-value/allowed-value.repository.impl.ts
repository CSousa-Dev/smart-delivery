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

  async listByAttribute(
    attributeId: string
  ): Promise<Array<{ id: string; name: string; value: string }>> {
    const values = await this.prisma.attributeAllowedValue.findMany({
      where: { attributeId },
      select: {
        id: true,
        name: true,
        value: true,
      },
    });

    return values;
  }
}
