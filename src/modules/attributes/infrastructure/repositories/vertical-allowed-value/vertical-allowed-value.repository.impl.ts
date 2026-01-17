import { PrismaClient } from '@prisma/client';
import { VerticalAllowedValueRepository } from '../../../domain/repositories/vertical-allowed-value.repository';
import { VerticalAllowedValue } from '../../../domain/entities/vertical-allowed-value.entity';
import { VerticalAllowedValueMapper } from './vertical-allowed-value.mapper';

export class PrismaVerticalAllowedValueRepository implements VerticalAllowedValueRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async saveAll(values: VerticalAllowedValue[]): Promise<void> {
    if (values.length === 0) {
      return;
    }

    await this.prisma.verticalAllowedValue.createMany({
      data: values.map(VerticalAllowedValueMapper.toPersistence),
    });
  }

  async listByVerticalAttribute(
    verticalAttributeId: string
  ): Promise<Array<{ id: string; name: string; value: string }>> {
    const values = await this.prisma.verticalAllowedValue.findMany({
      where: { verticalAttributeId },
      select: {
        id: true,
        name: true,
        value: true,
      },
    });

    return values;
  }
}
