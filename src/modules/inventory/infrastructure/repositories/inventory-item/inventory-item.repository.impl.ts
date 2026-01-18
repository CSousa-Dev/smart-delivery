import { PrismaClient } from '@prisma/client';
import { InventoryItemRepository } from '../../../domain/repositories/inventory-item.repository';
import { InventoryItem } from '../../../domain/entities/inventory-item.entity';
import { InventoryItemMapper } from './inventory-item.mapper';

export class PrismaInventoryItemRepository implements InventoryItemRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async existsByNameAndBusinessUnitId(
    nameNormalized: string,
    businessUnitId: string
  ): Promise<boolean> {
    const prisma = this.prisma as any;
    const count = await prisma.inventoryItem.count({
      where: { businessUnitId, nameNormalized },
    });

    return count > 0;
  }

  async existsById(businessUnitId: string, itemId: string): Promise<boolean> {
    const prisma = this.prisma as any;
    const count = await prisma.inventoryItem.count({
      where: { id: itemId, businessUnitId },
    });

    return count > 0;
  }

  async findById(id: string): Promise<{
    id: string;
    businessUnitId: string;
    unitOfMeasureId: string;
    requiresExpiration: boolean;
  } | null> {
    const prisma = this.prisma as any;
    const item = await prisma.inventoryItem.findUnique({
      where: { id },
      select: { id: true, businessUnitId: true, unitOfMeasureId: true, requiresExpiration: true },
    });

    if (!item) {
      return null;
    }

    return {
      id: item.id,
      businessUnitId: item.businessUnitId,
      unitOfMeasureId: item.unitOfMeasureId,
      requiresExpiration: item.requiresExpiration,
    };
  }

  async save(item: InventoryItem): Promise<void> {
    const prisma = this.prisma as any;
    await prisma.inventoryItem.create({
      data: InventoryItemMapper.toPersistence(item),
    });
  }
}
