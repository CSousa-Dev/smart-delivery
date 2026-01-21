import { PrismaClient } from '@prisma/client';
import { ProductItemLinkRepository } from '../../../domain/repositories/product-item-link.repository';
import { ProductItemLink, LinkStatus } from '../../../domain/entities/product-item-link.entity';
import { ProductItemLinkMapper } from './product-item-link.mapper';

export class PrismaProductItemLinkRepository implements ProductItemLinkRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByProductId(
    productId: string,
    businessUnitId: string
  ): Promise<ProductItemLink | null> {
    const prisma = this.prisma as any;
    const link = await prisma.productItemLink.findFirst({
      where: { productId, businessUnitId },
    });

    return link ? this.toDomain(link) : null;
  }

  async findByItemId(itemId: string, businessUnitId: string): Promise<ProductItemLink | null> {
    const prisma = this.prisma as any;
    const link = await prisma.productItemLink.findFirst({
      where: { itemId, businessUnitId },
    });

    return link ? this.toDomain(link) : null;
  }

  async findByProductAndItem(
    productId: string,
    itemId: string,
    businessUnitId: string
  ): Promise<ProductItemLink | null> {
    const prisma = this.prisma as any;
    const link = await prisma.productItemLink.findFirst({
      where: { productId, itemId, businessUnitId },
    });

    return link ? this.toDomain(link) : null;
  }

  async save(link: ProductItemLink): Promise<void> {
    const prisma = this.prisma as any;
    await prisma.productItemLink.create({
      data: ProductItemLinkMapper.toPersistence(link),
    });
  }

  async updateStatus(id: string, status: string, updatedBy: string): Promise<void> {
    const prisma = this.prisma as any;
    await prisma.productItemLink.update({
      where: { id },
      data: {
        status,
        updatedBy,
        updatedAt: new Date(),
      },
    });
  }

  private toDomain(record: {
    id: string;
    businessUnitId: string;
    productId: string;
    itemId: string;
    status: string;
    createdBy: string;
    createdAt: Date;
    updatedBy: string | null;
    updatedAt: Date | null;
  }): ProductItemLink {
    return ProductItemLink.restore({
      id: record.id,
      businessUnitId: record.businessUnitId,
      productId: record.productId,
      itemId: record.itemId,
      status: record.status as LinkStatus,
      createdBy: record.createdBy,
      createdAt: record.createdAt,
      updatedBy: record.updatedBy,
      updatedAt: record.updatedAt,
    });
  }
}
