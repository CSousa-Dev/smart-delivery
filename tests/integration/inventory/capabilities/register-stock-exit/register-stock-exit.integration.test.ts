import { RegisterStockExitService } from '../../../../../src/modules/inventory/application/services/register-stock-exit.service';
import { PrismaInventoryItemRepository } from '../../../../../src/modules/inventory/infrastructure/repositories/inventory-item/inventory-item.repository.impl';
import { PrismaUnitOfMeasureRepository } from '../../../../../src/modules/inventory/infrastructure/repositories/unit-of-measure/unit-of-measure.repository.impl';
import { PrismaStockLotRepository } from '../../../../../src/modules/inventory/infrastructure/repositories/stock-lot/stock-lot.repository.impl';
import { PrismaStockMovementRepository } from '../../../../../src/modules/inventory/infrastructure/repositories/stock-movement/stock-movement.repository.impl';
import { StockExitAllocationService } from '../../../../../src/modules/inventory/domain/services/stock-exit-allocation.service';
import { createInventoryTestPrismaClient } from '../../../../helpers/prisma/inventory/prisma-test-client';

const describeIf = process.env.DATABASE_URL_INVENTORY_TEST ? describe : describe.skip;

describeIf('Capability Register Stock Exit – [CAP-001]', () => {
  let prisma: any;

  beforeAll(() => {
    prisma = createInventoryTestPrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.stockMovement.deleteMany();
    await prisma.stockLot.deleteMany();
    await prisma.inventoryItem.deleteMany();
    await prisma.unitOfMeasure.deleteMany();
  });

  const seedData = async () => {
    await prisma.unitOfMeasure.create({
      data: {
        id: 'uom-1',
        organizationId: 'org-1',
        code: 'KG',
        codeNormalized: 'KG',
        name: 'Kilograma',
        nameNormalized: 'kilograma',
        symbol: 'kg',
        allowsFraction: true,
        status: 'ACTIVE',
        createdBy: 'user-1',
      },
    });

    await prisma.inventoryItem.create({
      data: {
        id: 'item-1',
        organizationId: 'org-1',
        businessUnitId: 'bu-1',
        name: 'Acucar',
        nameNormalized: 'acucar',
        type: 'INSUMO',
        unitOfMeasureId: 'uom-1',
        requiresExpiration: true,
        createdBy: 'user-1',
      },
    });

    await prisma.stockLot.create({
      data: {
        id: 'lot-1',
        businessUnitId: 'bu-1',
        itemId: 'item-1',
        lotNumber: 'LOT-1',
        expiresAt: new Date('2027-01-01T00:00:00.000Z'),
        quantityAvailable: 10,
        firstEntryAt: new Date('2026-01-01T00:00:00.000Z'),
      },
    });
  };

  it('should register stock exit with allocations – [SCN-001]', async () => {
    await seedData();

    const service = new RegisterStockExitService(
      new PrismaInventoryItemRepository(prisma),
      new PrismaUnitOfMeasureRepository(prisma),
      new PrismaStockLotRepository(prisma),
      new PrismaStockMovementRepository(prisma),
      new StockExitAllocationService()
    );

    const output = await service.execute({
      businessUnitId: 'bu-1',
      itemId: 'item-1',
      quantity: 3,
      movementSource: 'INVENTORY_ADJUSTMENT',
      occurredAt: new Date('2026-02-01T00:00:00.000Z'),
      createdBy: 'user-1',
      lotAllocations: [{ lotNumber: 'LOT-1', quantity: 3 }],
    });

    const lot = await prisma.stockLot.findUnique({ where: { id: 'lot-1' } });
    const movements = await prisma.stockMovement.findMany({ where: { itemId: 'item-1' } });

    expect(output.lots).toHaveLength(1);
    expect(Number(lot?.quantityAvailable)).toBe(7);
    expect(movements).toHaveLength(1);
  });
});
