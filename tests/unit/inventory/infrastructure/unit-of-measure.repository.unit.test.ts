import { PrismaUnitOfMeasureRepository } from '../../../../src/modules/inventory/infrastructure/repositories/unit-of-measure/unit-of-measure.repository.impl';

describe('PrismaUnitOfMeasureRepository', () => {
  it('should return null when unit does not exist', async () => {
    const prisma = {
      unitOfMeasure: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
    } as any;

    const repository = new PrismaUnitOfMeasureRepository(prisma);

    const result = await repository.findById('uom-1');

    expect(result).toBeNull();
    expect(prisma.unitOfMeasure.findUnique).toHaveBeenCalledWith({
      where: { id: 'uom-1' },
      select: {
        id: true,
        organizationId: true,
        code: true,
        name: true,
        nameNormalized: true,
        symbol: true,
        allowsFraction: true,
        status: true,
        createdBy: true,
        createdAt: true,
        updatedBy: true,
        updatedAt: true,
      },
    });
  });

  it('should return unit data when found', async () => {
    const prisma = {
      unitOfMeasure: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'uom-1',
          organizationId: 'org-1',
          code: 'KG',
          name: 'Kilograma',
          nameNormalized: 'kilograma',
          symbol: 'kg',
          allowsFraction: true,
          status: 'ACTIVE',
          createdBy: 'user-1',
          createdAt: new Date('2026-01-01T00:00:00.000Z'),
          updatedBy: null,
          updatedAt: null,
        }),
      },
    } as any;

    const repository = new PrismaUnitOfMeasureRepository(prisma);

    const result = await repository.findById('uom-1');

    expect(result).toEqual({
      id: 'uom-1',
      organizationId: 'org-1',
      code: 'KG',
      name: 'Kilograma',
      nameNormalized: 'kilograma',
      symbol: 'kg',
      allowsFraction: true,
      status: 'ACTIVE',
      createdBy: 'user-1',
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedBy: null,
      updatedAt: null,
    });
  });
});
