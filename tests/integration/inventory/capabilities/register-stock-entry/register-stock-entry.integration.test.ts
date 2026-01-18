import { RegisterStockEntryService } from '../../../../../src/modules/inventory/application/services/register-stock-entry.service';
import { PrismaInventoryItemRepository } from '../../../../../src/modules/inventory/infrastructure/repositories/inventory-item/inventory-item.repository.impl';
import { PrismaUnitOfMeasureRepository } from '../../../../../src/modules/inventory/infrastructure/repositories/unit-of-measure/unit-of-measure.repository.impl';
import { PrismaStockLotRepository } from '../../../../../src/modules/inventory/infrastructure/repositories/stock-lot/stock-lot.repository.impl';
import { PrismaStockMovementRepository } from '../../../../../src/modules/inventory/infrastructure/repositories/stock-movement/stock-movement.repository.impl';
import { createInventoryTestPrismaClient } from '../../../../helpers/prisma/inventory/prisma-test-client';

const describeIf = process.env.DATABASE_URL_INVENTORY_TEST ? describe : describe.skip;

describeIf('Capability Register Stock Entry – [CAP-001]', () => {
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

  const seedUnitAndItem = async () => {
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
  };

  it('should register entry creating new lot – [SCN-001]', async () => {
    await seedUnitAndItem();
    const service = new RegisterStockEntryService(
      new PrismaInventoryItemRepository(prisma),
      new PrismaUnitOfMeasureRepository(prisma),
      new PrismaStockLotRepository(prisma),
      new PrismaStockMovementRepository(prisma)
    );

    const output = await service.execute({
      businessUnitId: 'bu-1',
      itemId: 'item-1',
      lotNumber: 'LOT-1',
      quantity: 5,
      movementSource: 'INVENTORY_ADJUSTMENT',
      occurredAt: new Date('2026-02-01T00:00:00.000Z'),
      createdBy: 'user-1',
      expiresAt: new Date('2027-02-01T00:00:00.000Z'),
    });

    const lot = await prisma.stockLot.findUnique({
      where: { id: output.lotId },
    });
    const movement = await prisma.stockMovement.findUnique({
      where: { id: output.movementId },
    });

    expect(lot).not.toBeNull();
    expect(movement).not.toBeNull();
  });
});
