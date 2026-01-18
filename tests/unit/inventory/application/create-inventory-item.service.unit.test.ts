import { CreateInventoryItemService } from '../../../../src/modules/inventory/application/services/create-inventory-item.service';
import { InventoryItemRepository } from '../../../../src/modules/inventory/domain/repositories/inventory-item.repository';
import { BusinessUnitRepository } from '../../../../src/modules/inventory/domain/ports/business-unit.repository';
import { UnitOfMeasureRepository } from '../../../../src/modules/inventory/domain/repositories/unit-of-measure.repository';
import {
  BusinessUnitNotFoundError,
  BusinessUnitOrganizationMismatchError,
  InventoryItemNameAlreadyExistsError,
  UnitOfMeasureInactiveError,
  UnitOfMeasureNotFoundError,
  UnitOfMeasureOrganizationMismatchError,
} from '../../../../src/modules/inventory/domain/errors/inventory-item.errors';

describe('CreateInventoryItemService', () => {
  const buildService = () => {
    const inventoryItemRepository: InventoryItemRepository = {
      existsByNameAndBusinessUnitId: jest.fn().mockResolvedValue(false),
      existsById: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
    };
    const businessUnitRepository: BusinessUnitRepository = {
      existsById: jest.fn().mockResolvedValue(true),
      existsByIdAndOrganizationId: jest.fn().mockResolvedValue(true),
    };
    const unitOfMeasureRepository: UnitOfMeasureRepository = {
      existsByCode: jest.fn(),
      existsByName: jest.fn(),
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
    };

    return {
      service: new CreateInventoryItemService(
        inventoryItemRepository,
        businessUnitRepository,
        unitOfMeasureRepository
      ),
      inventoryItemRepository,
      businessUnitRepository,
      unitOfMeasureRepository,
    };
  };

  it('should reject when business unit does not exist', async () => {
    const { service, businessUnitRepository } = buildService();
    (businessUnitRepository.existsById as jest.Mock).mockResolvedValue(false);

    await expect(
      service.execute({
        organizationId: 'org-1',
        businessUnitId: 'bu-1',
        name: 'Acucar',
        type: 'INSUMO',
        unitOfMeasureId: 'uom-1',
        requiresExpiration: true,
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(BusinessUnitNotFoundError);
  });

  it('should reject when business unit is not in organization', async () => {
    const { service, businessUnitRepository } = buildService();
    (businessUnitRepository.existsByIdAndOrganizationId as jest.Mock).mockResolvedValue(
      false
    );

    await expect(
      service.execute({
        organizationId: 'org-1',
        businessUnitId: 'bu-1',
        name: 'Acucar',
        type: 'INSUMO',
        unitOfMeasureId: 'uom-1',
        requiresExpiration: true,
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(BusinessUnitOrganizationMismatchError);
  });

  it('should reject when unit of measure does not exist', async () => {
    const { service, unitOfMeasureRepository } = buildService();
    (unitOfMeasureRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      service.execute({
        organizationId: 'org-1',
        businessUnitId: 'bu-1',
        name: 'Acucar',
        type: 'INSUMO',
        unitOfMeasureId: 'uom-1',
        requiresExpiration: true,
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(UnitOfMeasureNotFoundError);
  });

  it('should reject when unit of measure belongs to another organization', async () => {
    const { service, unitOfMeasureRepository } = buildService();
    (unitOfMeasureRepository.findById as jest.Mock).mockResolvedValue({
      id: 'uom-1',
      organizationId: 'org-2',
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

    await expect(
      service.execute({
        organizationId: 'org-1',
        businessUnitId: 'bu-1',
        name: 'Acucar',
        type: 'INSUMO',
        unitOfMeasureId: 'uom-1',
        requiresExpiration: true,
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(UnitOfMeasureOrganizationMismatchError);
  });

  it('should reject when unit of measure is inactive', async () => {
    const { service, unitOfMeasureRepository } = buildService();
    (unitOfMeasureRepository.findById as jest.Mock).mockResolvedValue({
      id: 'uom-1',
      organizationId: 'org-1',
      code: 'KG',
      name: 'Kilograma',
      nameNormalized: 'kilograma',
      symbol: 'kg',
      allowsFraction: true,
      status: 'INACTIVE',
      createdBy: 'user-1',
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedBy: null,
      updatedAt: null,
    });

    await expect(
      service.execute({
        organizationId: 'org-1',
        businessUnitId: 'bu-1',
        name: 'Acucar',
        type: 'INSUMO',
        unitOfMeasureId: 'uom-1',
        requiresExpiration: true,
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(UnitOfMeasureInactiveError);
  });

  it('should reject duplicated name', async () => {
    const { service, inventoryItemRepository } = buildService();
    (inventoryItemRepository.existsByNameAndBusinessUnitId as jest.Mock).mockResolvedValue(
      true
    );

    await expect(
      service.execute({
        organizationId: 'org-1',
        businessUnitId: 'bu-1',
        name: 'Acucar',
        type: 'INSUMO',
        unitOfMeasureId: 'uom-1',
        requiresExpiration: true,
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(InventoryItemNameAlreadyExistsError);
  });

  it('should create inventory item when valid', async () => {
    const { service, inventoryItemRepository } = buildService();

    const output = await service.execute({
      organizationId: 'org-1',
      businessUnitId: 'bu-1',
      name: 'Acucar',
      type: 'INSUMO',
      unitOfMeasureId: 'uom-1',
      requiresExpiration: true,
      createdBy: 'user-1',
    });

    expect(inventoryItemRepository.save).toHaveBeenCalledTimes(1);
    expect(output.businessUnitId).toBe('bu-1');
    expect(output.name).toBe('Acucar');
    expect(output.type).toBe('INSUMO');
    expect(output.requiresExpiration).toBe(true);
  });
});
