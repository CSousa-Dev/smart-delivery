import { PrismaClient } from '@prisma/client';
import { PrismaInventoryItemRepository } from '../repositories/inventory-item/inventory-item.repository.impl';
import { PrismaUnitOfMeasureRepository } from '../repositories/unit-of-measure/unit-of-measure.repository.impl';
import { PrismaStockLotRepository } from '../repositories/stock-lot/stock-lot.repository.impl';
import { PrismaStockMovementRepository } from '../repositories/stock-movement/stock-movement.repository.impl';

export function createInventoryRepositories(prisma: PrismaClient) {
  return {
    inventoryItemRepository: new PrismaInventoryItemRepository(prisma),
    unitOfMeasureRepository: new PrismaUnitOfMeasureRepository(prisma),
    stockLotRepository: new PrismaStockLotRepository(prisma),
    stockMovementRepository: new PrismaStockMovementRepository(prisma),
  };
}
