import { GetStockPositionService } from '../../../../../src/modules/inventory/application/services/get-stock-position.service';
import { PrismaInventoryItemRepository } from '../../../../../src/modules/inventory/infrastructure/repositories/inventory-item/inventory-item.repository.impl';
import { PrismaStockLotRepository } from '../../../../../src/modules/inventory/infrastructure/repositories/stock-lot/stock-lot.repository.impl';
import { createInventoryTestPrismaClient } from '../../../../helpers/prisma/inventory/prisma-test-client';

const describeIf = process.env.DATABASE_URL_INVENTORY_TEST ? describe : describe.skip;

describeIf('Capability Get Stock Position – [CAP-001]', () => {
  let prisma: any;

  beforeAll(() => {
    prisma = createInventoryTestPrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.stockLot.deleteMany();
    await prisma.inventoryItem.deleteMany();
    await prisma.unitOfMeasure.deleteMany();
  });

  const seedItemAndLots = async () => {
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
        requiresExpiration: false,
        createdBy: 'user-1',
      },
    });

    await prisma.stockLot.createMany({
      data: [
        {
          id: 'lot-1',
          businessUnitId: 'bu-1',
          itemId: 'item-1',
          lotNumber: 'LOT-1',
          expiresAt: null,
          quantityAvailable: 5,
          firstEntryAt: new Date('2026-01-01T00:00:00.000Z'),
        },
        {
          id: 'lot-2',
          businessUnitId: 'bu-1',
          itemId: 'item-1',
          lotNumber: 'LOT-2',
          expiresAt: null,
          quantityAvailable: 0,
          firstEntryAt: new Date('2026-01-02T00:00:00.000Z'),
        },
      ],
    });
  };

  it('should return position by item – [SCN-001]', async () => {
    await seedItemAndLots();
    const service = new GetStockPositionService(
      new PrismaInventoryItemRepository(prisma),
      new PrismaStockLotRepository(prisma)
    );

    const output = await service.execute({
      businessUnitId: 'bu-1',
      itemId: 'item-1',
    });

    expect('totalAvailable' in output).toBe(true);
    if ('totalAvailable' in output) {
      expect(output.totalAvailable).toBe(5);
      expect(output.lots).toHaveLength(1);
    }
  });
});
