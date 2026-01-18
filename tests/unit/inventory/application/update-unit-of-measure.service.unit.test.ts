import { UpdateUnitOfMeasureService } from '../../../../src/modules/inventory/application/services/update-unit-of-measure.service';
import { UnitOfMeasureRepository } from '../../../../src/modules/inventory/domain/repositories/unit-of-measure.repository';
import {
  InvalidUnitStatusError,
  NoUpdatableFieldsError,
  UnitNameAlreadyExistsError,
  UnitOfMeasureNotFoundError,
} from '../../../../src/modules/inventory/domain/errors/unit-of-measure.errors';

describe('UpdateUnitOfMeasureService', () => {
  const buildService = (overrides?: Partial<UnitOfMeasureRepository>) => {
    const unitRepository: UnitOfMeasureRepository = {
      existsByCode: jest.fn(),
      existsByName: jest.fn().mockResolvedValue(false),
      save: jest.fn(),
      findById: jest.fn().mockResolvedValue({
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
      ...overrides,
    };

    return {
      service: new UpdateUnitOfMeasureService(unitRepository),
      unitRepository,
    };
  };

  it('should reject when unit does not exist', async () => {
    const { service } = buildService({
      findById: jest.fn().mockResolvedValue(null),
    });

    await expect(
      service.execute({
        unitOfMeasureId: 'uom-1',
        name: 'Quilograma',
        updatedBy: 'user-2',
      })
    ).rejects.toBeInstanceOf(UnitOfMeasureNotFoundError);
  });

  it('should reject when no updatable fields provided', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        unitOfMeasureId: 'uom-1',
        updatedBy: 'user-2',
      })
    ).rejects.toBeInstanceOf(NoUpdatableFieldsError);
  });

  it('should reject invalid status', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        unitOfMeasureId: 'uom-1',
        status: 'INVALID',
        updatedBy: 'user-2',
      })
    ).rejects.toBeInstanceOf(InvalidUnitStatusError);
  });

  it('should reject duplicated name', async () => {
    const { service, unitRepository } = buildService();
    (unitRepository.existsByName as jest.Mock).mockResolvedValue(true);

    await expect(
      service.execute({
        unitOfMeasureId: 'uom-1',
        name: 'Quilograma',
        updatedBy: 'user-2',
      })
    ).rejects.toBeInstanceOf(UnitNameAlreadyExistsError);
  });

  it('should be idempotent when name and status are unchanged', async () => {
    const { service, unitRepository } = buildService();

    const output = await service.execute({
      unitOfMeasureId: 'uom-1',
      name: 'Kilograma',
      status: 'ACTIVE',
      updatedBy: 'user-2',
    });

    expect(unitRepository.save).not.toHaveBeenCalled();
    expect(output.updatedAt).toBeNull();
    expect(output.updatedBy).toBeNull();
  });

  it('should update name and status when changed', async () => {
    const { service, unitRepository } = buildService();

    const output = await service.execute({
      unitOfMeasureId: 'uom-1',
      name: 'Quilograma',
      status: 'INACTIVE',
      updatedBy: 'user-2',
    });

    expect(unitRepository.save).toHaveBeenCalledTimes(1);
    expect(output.name).toBe('Quilograma');
    expect(output.status).toBe('INACTIVE');
    expect(output.updatedBy).toBe('user-2');
    expect(output.updatedAt).toBeInstanceOf(Date);
  });
});
