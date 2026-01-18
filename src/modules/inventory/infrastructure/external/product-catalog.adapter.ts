import { ProductRepository } from '../../domain/ports/product.repository';
import { ProductsDbClient } from '../../../products/infrastructure/database/prisma/prisma-client';

export class ProductCatalogAdapter implements ProductRepository {
  constructor(private readonly prisma: ProductsDbClient) {}

  async findById(id: string): Promise<{ id: string; businessUnitId: string } | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: { id: true, businessUnitId: true },
    });

    if (!product) {
      return null;
    }

    return {
      id: product.id,
      businessUnitId: product.businessUnitId,
    };
  }
}
