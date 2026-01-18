import { UpdateUnitOfMeasureService } from '../../../../../src/modules/inventory/application/services/update-unit-of-measure.service';
import { PrismaUnitOfMeasureRepository } from '../../../../../src/modules/inventory/infrastructure/repositories/unit-of-measure/unit-of-measure.repository.impl';
import { createInventoryTestPrismaClient } from '../../../../helpers/prisma/inventory/prisma-test-client';

const describeIf = process.env.DATABASE_URL_INVENTORY_TEST ? describe : describe.skip;

describeIf('Capability Update/Deactivate Unit of Measure – [CAP-001]', () => {
  let prisma: any;

  beforeAll(() => {
    prisma = createInventoryTestPrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.inventoryItem.deleteMany();
    await prisma.unitOfMeasure.deleteMany();
  });

  const seedUnitOfMeasure = async () => {
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
  };

  it('should update unit name – [SCN-001]', async () => {
    await seedUnitOfMeasure();
    const service = new UpdateUnitOfMeasureService(
      new PrismaUnitOfMeasureRepository(prisma)
    );

    const output = await service.execute({
      unitOfMeasureId: 'uom-1',
      name: 'Quilograma',
      updatedBy: 'user-2',
    });

    const persisted = await prisma.unitOfMeasure.findUnique({
      where: { id: output.id },
    });

    expect(persisted?.name).toBe('Quilograma');
    expect(persisted?.updatedBy).toBe('user-2');
  });

  it('should update unit status – [SCN-007]', async () => {
    await seedUnitOfMeasure();
    const service = new UpdateUnitOfMeasureService(
      new PrismaUnitOfMeasureRepository(prisma)
    );

    const output = await service.execute({
      unitOfMeasureId: 'uom-1',
      status: 'INACTIVE',
      updatedBy: 'user-2',
    });

    const persisted = await prisma.unitOfMeasure.findUnique({
      where: { id: output.id },
    });

    expect(persisted?.status).toBe('INACTIVE');
    expect(persisted?.updatedBy).toBe('user-2');
  });

  it('should be idempotent when no changes – [SCN-009]', async () => {
    await seedUnitOfMeasure();
    const initial = await prisma.unitOfMeasure.findUnique({
      where: { id: 'uom-1' },
    });
    const service = new UpdateUnitOfMeasureService(
      new PrismaUnitOfMeasureRepository(prisma)
    );

    const output = await service.execute({
      unitOfMeasureId: 'uom-1',
      name: 'Kilograma',
      status: 'ACTIVE',
      updatedBy: 'user-2',
    });

    const persisted = await prisma.unitOfMeasure.findUnique({
      where: { id: output.id },
    });

    expect(output.updatedAt?.getTime() ?? null).toBe(
      initial?.updatedAt ? new Date(initial.updatedAt).getTime() : null
    );
    expect(output.updatedBy).toBe(initial?.updatedBy ?? null);
    expect(persisted?.updatedAt ? new Date(persisted.updatedAt).getTime() : null).toBe(
      initial?.updatedAt ? new Date(initial.updatedAt).getTime() : null
    );
    expect(persisted?.updatedBy ?? null).toBe(initial?.updatedBy ?? null);
  });
});
