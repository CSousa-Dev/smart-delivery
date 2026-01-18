import { CreateInventoryItemService } from '../../../../../src/modules/inventory/application/services/create-inventory-item.service';
import { PrismaInventoryItemRepository } from '../../../../../src/modules/inventory/infrastructure/repositories/inventory-item/inventory-item.repository.impl';
import { PrismaUnitOfMeasureRepository } from '../../../../../src/modules/inventory/infrastructure/repositories/unit-of-measure/unit-of-measure.repository.impl';
import { createInventoryTestPrismaClient } from '../../../../helpers/prisma/inventory/prisma-test-client';
import { BusinessUnitRepository } from '../../../../../src/modules/inventory/domain/ports/business-unit.repository';
import { InventoryItemNameAlreadyExistsError } from '../../../../../src/modules/inventory/domain/errors/inventory-item.errors';

const describeIf = process.env.DATABASE_URL_INVENTORY_TEST ? describe : describe.skip;

describeIf('Capability Create Inventory Item – [CAP-001]', () => {
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

  it('should create inventory item – [SCN-001]', async () => {
    await seedUnitOfMeasure();
    const businessUnitRepository: BusinessUnitRepository = {
      existsById: jest.fn().mockResolvedValue(true),
      existsByIdAndOrganizationId: jest.fn().mockResolvedValue(true),
    };

    const service = new CreateInventoryItemService(
      new PrismaInventoryItemRepository(prisma),
      businessUnitRepository,
      new PrismaUnitOfMeasureRepository(prisma)
    );

    const output = await service.execute({
      organizationId: 'org-1',
      businessUnitId: 'bu-1',
      name: 'Acucar',
      type: 'INSUMO',
      unitOfMeasureId: 'uom-1',
      requiresExpiration: true,
      createdBy: 'user-1',
    });

    const persisted = await prisma.inventoryItem.findUnique({
      where: { id: output.id },
    });

    expect(persisted).not.toBeNull();
    expect(persisted?.name).toBe('Acucar');
    expect(persisted?.requiresExpiration).toBe(true);
  });

  it('should reject duplicated name (case-insensitive) – [SCN-006]', async () => {
    await seedUnitOfMeasure();
    const businessUnitRepository: BusinessUnitRepository = {
      existsById: jest.fn().mockResolvedValue(true),
      existsByIdAndOrganizationId: jest.fn().mockResolvedValue(true),
    };

    const service = new CreateInventoryItemService(
      new PrismaInventoryItemRepository(prisma),
      businessUnitRepository,
      new PrismaUnitOfMeasureRepository(prisma)
    );

    await service.execute({
      organizationId: 'org-1',
      businessUnitId: 'bu-1',
      name: 'Acucar',
      type: 'INSUMO',
      unitOfMeasureId: 'uom-1',
      requiresExpiration: true,
      createdBy: 'user-1',
    });

    await expect(
      service.execute({
        organizationId: 'org-1',
        businessUnitId: 'bu-1',
        name: 'acucar',
        type: 'INSUMO',
        unitOfMeasureId: 'uom-1',
        requiresExpiration: true,
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(InventoryItemNameAlreadyExistsError);
  });
});
