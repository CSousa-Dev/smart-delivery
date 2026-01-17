import { PrismaClient } from '@prisma/client';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { Product } from '../../../domain/entities/product.entity';
import { ProductMapper } from './product.mapper';

export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async existsByCodeAndOrganizationId(
    codeNormalized: string,
    organizationId: string
  ): Promise<boolean> {
    const prisma = this.prisma as any;
    const count = await prisma.product.count({
      where: { organizationId, codeNormalized },
    });

    return count > 0;
  }

  async existsByTitleAndBusinessUnitId(
    titleNormalized: string,
    businessUnitId: string
  ): Promise<boolean> {
    const prisma = this.prisma as any;
    const count = await prisma.product.count({
      where: { businessUnitId, titleNormalized },
    });

    return count > 0;
  }

  async save(product: Product): Promise<void> {
    const prisma = this.prisma as any;
    await prisma.$transaction(async (tx: any) => {
      await tx.product.create({
        data: ProductMapper.toPersistence(product),
      });
    });
  }
}
