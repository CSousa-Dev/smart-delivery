import { PrismaClient } from '@prisma/client';
import { CategoryAllowedValueRepository } from '../../../domain/repositories/category-allowed-value.repository';
import { CategoryAllowedValue } from '../../../domain/entities/category-allowed-value.entity';
import { CategoryAllowedValueMapper } from './category-allowed-value.mapper';

export class PrismaCategoryAllowedValueRepository implements CategoryAllowedValueRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async saveAll(values: CategoryAllowedValue[]): Promise<void> {
    if (values.length === 0) {
      return;
    }

    await this.prisma.categoryAllowedValue.createMany({
      data: values.map(CategoryAllowedValueMapper.toPersistence),
    });
  }

  async listByCategoryAttribute(
    categoryAttributeId: string
  ): Promise<Array<{ id: string; name: string; value: string }>> {
    const values = await this.prisma.categoryAllowedValue.findMany({
      where: { categoryAttributeId },
      select: {
        id: true,
        name: true,
        value: true,
      },
    });

    return values;
  }
}
