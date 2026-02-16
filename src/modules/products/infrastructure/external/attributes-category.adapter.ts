import { PrismaClient } from '@prisma/client';
import { CategoryRepository } from '../../domain/ports/category.repository';

export class AttributesCategoryAdapter implements CategoryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<{ id: string; verticalCode: string; verticalId: string } | null> {
    const category = await this.prisma.category.findUnique({
      where: { id },
      select: { id: true, verticalId: true, vertical: { select: { code: true } } },
    });

    if (!category) {
      return null;
    }

    return {
      id: category.id,
      verticalCode: category.vertical.code,
      verticalId: category.verticalId,
    };
  }
}
