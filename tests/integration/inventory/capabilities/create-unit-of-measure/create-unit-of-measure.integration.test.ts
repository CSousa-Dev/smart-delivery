import { CreateUnitOfMeasureService } from '../../../../../src/modules/inventory/application/services/create-unit-of-measure.service';
import { PrismaUnitOfMeasureRepository } from '../../../../../src/modules/inventory/infrastructure/repositories/unit-of-measure/unit-of-measure.repository.impl';
import { createInventoryTestPrismaClient } from '../../../../helpers/prisma/inventory/prisma-test-client';
import { OrganizationRepository } from '../../../../../src/modules/inventory/domain/ports/organization.repository';
import { UnitCodeAlreadyExistsError } from '../../../../../src/modules/inventory/domain/errors/unit-of-measure.errors';

const describeIf = process.env.DATABASE_URL_INVENTORY_TEST ? describe : describe.skip;

describeIf('Capability Create Unit of Measure – [CAP-001]', () => {
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

  it('should create unit of measure – [SCN-001]', async () => {
    const organizationRepository: OrganizationRepository = {
      existsById: jest.fn().mockResolvedValue(true),
    };
    const service = new CreateUnitOfMeasureService(
      new PrismaUnitOfMeasureRepository(prisma),
      organizationRepository
    );

    const output = await service.execute({
      organizationId: 'org-1',
      code: 'KG',
      name: 'Kilograma',
      symbol: 'kg',
      allowsFraction: true,
      createdBy: 'user-1',
    });

    const persisted = await prisma.unitOfMeasure.findUnique({
      where: { id: output.id },
    });

    expect(persisted).not.toBeNull();
    expect(persisted?.code).toBe('KG');
    expect(persisted?.status).toBe('ACTIVE');
  });

  it('should reject duplicated code (case-insensitive) – [SCN-002]', async () => {
    const organizationRepository: OrganizationRepository = {
      existsById: jest.fn().mockResolvedValue(true),
    };
    const service = new CreateUnitOfMeasureService(
      new PrismaUnitOfMeasureRepository(prisma),
      organizationRepository
    );

    await service.execute({
      organizationId: 'org-1',
      code: 'KG',
      name: 'Kilograma',
      symbol: 'kg',
      allowsFraction: true,
      createdBy: 'user-1',
    });

    await expect(
      service.execute({
        organizationId: 'org-1',
        code: 'kg',
        name: 'Kilograma 2',
        symbol: 'kg',
        allowsFraction: true,
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(UnitCodeAlreadyExistsError);
  });
});
