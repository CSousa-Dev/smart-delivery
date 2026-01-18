import { RegisterStockEntryService } from '../../../../src/modules/inventory/application/services/register-stock-entry.service';
import { InventoryItemRepository } from '../../../../src/modules/inventory/domain/repositories/inventory-item.repository';
import { UnitOfMeasureRepository } from '../../../../src/modules/inventory/domain/repositories/unit-of-measure.repository';
import { StockLotRepository } from '../../../../src/modules/inventory/domain/repositories/stock-lot.repository';
import { StockMovementRepository } from '../../../../src/modules/inventory/domain/repositories/stock-movement.repository';
import {
  FractionNotAllowedError,
  InvalidMovementSourceError,
  InvalidQuantityError,
  InventoryItemNotFoundError,
  LotItemConflictError,
  MissingExpirationError,
  MissingExternalIdError,
} from '../../../../src/modules/inventory/domain/errors/stock-entry.errors';
import { StockLot } from '../../../../src/modules/inventory/domain/entities/stock-lot.entity';

describe('RegisterStockEntryService', () => {
  const buildService = () => {
    const inventoryItemRepository: InventoryItemRepository = {
      existsByNameAndBusinessUnitId: jest.fn(),
      existsById: jest.fn(),
      findById: jest.fn().mockResolvedValue({
        id: 'item-1',
        businessUnitId: 'bu-1',
        unitOfMeasureId: 'uom-1',
        requiresExpiration: true,
      }),
      save: jest.fn(),
    };
    const unitOfMeasureRepository: UnitOfMeasureRepository = {
      existsByCode: jest.fn(),
      existsByName: jest.fn(),
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
      save: jest.fn(),
    };
    const stockLotRepository: StockLotRepository = {
      findByLotNumber: jest.fn().mockResolvedValue(null),
      findByLotNumbers: jest.fn().mockResolvedValue([]),
      listAvailableLots: jest.fn().mockResolvedValue([]),
      listByItemId: jest.fn().mockResolvedValue([]),
      save: jest.fn(),
      incrementQuantity: jest.fn(),
      decrementLots: jest.fn(),
    };
    const stockMovementRepository: StockMovementRepository = {
      save: jest.fn(),
      saveAll: jest.fn(),
      listByFilters: jest.fn(),
    };

    return {
      service: new RegisterStockEntryService(
        inventoryItemRepository,
        unitOfMeasureRepository,
        stockLotRepository,
        stockMovementRepository
      ),
      inventoryItemRepository,
      unitOfMeasureRepository,
      stockLotRepository,
      stockMovementRepository,
    };
  };

  it('should reject invalid quantity', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        businessUnitId: 'bu-1',
        itemId: 'item-1',
        lotNumber: 'LOT-1',
        quantity: 0,
        movementSource: 'INVENTORY_ADJUSTMENT',
        occurredAt: new Date(),
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(InvalidQuantityError);
  });

  it('should reject invalid movement source', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        businessUnitId: 'bu-1',
        itemId: 'item-1',
        lotNumber: 'LOT-1',
        quantity: 5,
        movementSource: 'INVALID',
        occurredAt: new Date(),
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(InvalidMovementSourceError);
  });

  it('should require externalId for non adjustment sources', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        businessUnitId: 'bu-1',
        itemId: 'item-1',
        lotNumber: 'LOT-1',
        quantity: 5,
        movementSource: 'PURCHASE_ORDER',
        occurredAt: new Date(),
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(MissingExternalIdError);
  });

  it('should reject when item does not exist', async () => {
    const { service, inventoryItemRepository } = buildService();
    (inventoryItemRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      service.execute({
        businessUnitId: 'bu-1',
        itemId: 'item-1',
        lotNumber: 'LOT-1',
        quantity: 5,
        movementSource: 'INVENTORY_ADJUSTMENT',
        occurredAt: new Date(),
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(InventoryItemNotFoundError);
  });

  it('should reject fractional quantity when unit does not allow', async () => {
    const { service, unitOfMeasureRepository } = buildService();
    (unitOfMeasureRepository.findById as jest.Mock).mockResolvedValue({
      id: 'uom-1',
      organizationId: 'org-1',
      code: 'UN',
      name: 'Unidade',
      nameNormalized: 'unidade',
      symbol: 'un',
      allowsFraction: false,
      status: 'ACTIVE',
      createdBy: 'user-1',
      createdAt: new Date(),
      updatedBy: null,
      updatedAt: null,
    });

    await expect(
      service.execute({
        businessUnitId: 'bu-1',
        itemId: 'item-1',
        lotNumber: 'LOT-1',
        quantity: 1.5,
        movementSource: 'INVENTORY_ADJUSTMENT',
        occurredAt: new Date(),
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(FractionNotAllowedError);
  });

  it('should reject missing expiration when item requires', async () => {
    const { service, stockLotRepository } = buildService();
    (stockLotRepository.findByLotNumber as jest.Mock).mockResolvedValue(null);

    await expect(
      service.execute({
        businessUnitId: 'bu-1',
        itemId: 'item-1',
        lotNumber: 'LOT-1',
        quantity: 5,
        movementSource: 'INVENTORY_ADJUSTMENT',
        occurredAt: new Date(),
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(MissingExpirationError);
  });

  it('should reject when lot belongs to another item', async () => {
    const { service, stockLotRepository } = buildService();
    (stockLotRepository.findByLotNumber as jest.Mock).mockResolvedValue(
      StockLot.restore({
        id: 'lot-1',
        businessUnitId: 'bu-1',
        itemId: 'item-2',
        lotNumber: 'LOT-1',
        expiresAt: null,
        quantityAvailable: 5,
        firstEntryAt: new Date(),
      })
    );

    await expect(
      service.execute({
        businessUnitId: 'bu-1',
        itemId: 'item-1',
        lotNumber: 'LOT-1',
        quantity: 5,
        movementSource: 'INVENTORY_ADJUSTMENT',
        occurredAt: new Date(),
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(LotItemConflictError);
  });

  it('should register entry for new lot', async () => {
    const { service, stockLotRepository, stockMovementRepository } = buildService();

    const output = await service.execute({
      businessUnitId: 'bu-1',
      itemId: 'item-1',
      lotNumber: 'LOT-1',
      quantity: 5,
      movementSource: 'INVENTORY_ADJUSTMENT',
      occurredAt: new Date(),
      createdBy: 'user-1',
      expiresAt: new Date('2026-12-31T00:00:00.000Z'),
    });

    expect(stockLotRepository.save).toHaveBeenCalledTimes(1);
    expect(stockMovementRepository.save).toHaveBeenCalledTimes(1);
    expect(output.lotNumber).toBe('LOT-1');
  });
});
