import { ListStockMovementsService } from '../../../../../src/modules/inventory/application/services/list-stock-movements.service';
import { PrismaStockMovementRepository } from '../../../../../src/modules/inventory/infrastructure/repositories/stock-movement/stock-movement.repository.impl';
import { createInventoryTestPrismaClient } from '../../../../helpers/prisma/inventory/prisma-test-client';

const describeIf = process.env.DATABASE_URL_INVENTORY_TEST ? describe : describe.skip;

describeIf('Capability List Stock Movements – [CAP-001]', () => {
  let prisma: any;

  beforeAll(() => {
    prisma = createInventoryTestPrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.stockMovement.deleteMany();
  });

  it('should list movements by filters – [SCN-001]', async () => {
    await prisma.stockMovement.createMany({
      data: [
        {
          id: 'mov-1',
          businessUnitId: 'bu-1',
          itemId: 'item-1',
          lotNumber: 'LOT-1',
          type: 'ENTRY',
          quantity: 5,
          movementSource: 'INVENTORY_ADJUSTMENT',
          externalId: null,
          occurredAt: new Date('2026-01-01T00:00:00.000Z'),
          createdBy: 'user-1',
        },
        {
          id: 'mov-2',
          businessUnitId: 'bu-1',
          itemId: 'item-1',
          lotNumber: 'LOT-2',
          type: 'EXIT',
          quantity: 2,
          movementSource: 'INVENTORY_ADJUSTMENT',
          externalId: null,
          occurredAt: new Date('2026-01-02T00:00:00.000Z'),
          createdBy: 'user-1',
        },
      ],
    });

    const service = new ListStockMovementsService(new PrismaStockMovementRepository(prisma));

    const output = await service.execute({
      businessUnitId: 'bu-1',
      itemId: 'item-1',
      page: 1,
      pageSize: 50,
    });

    expect(output.records).toHaveLength(2);
    expect(output.total).toBe(2);
  });
});
