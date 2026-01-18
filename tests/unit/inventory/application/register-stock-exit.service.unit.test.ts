import { RegisterStockExitService } from '../../../../src/modules/inventory/application/services/register-stock-exit.service';
import { InventoryItemRepository } from '../../../../src/modules/inventory/domain/repositories/inventory-item.repository';
import { UnitOfMeasureRepository } from '../../../../src/modules/inventory/domain/repositories/unit-of-measure.repository';
import { StockLotRepository } from '../../../../src/modules/inventory/domain/repositories/stock-lot.repository';
import { StockMovementRepository } from '../../../../src/modules/inventory/domain/repositories/stock-movement.repository';
import { StockExitAllocationService } from '../../../../src/modules/inventory/domain/services/stock-exit-allocation.service';
import {
  AllocationSumMismatchError,
  InvalidMovementSourceError,
  InvalidQuantityError,
  InventoryItemNotFoundError,
  LotInsufficientBalanceError,
  LotNotFoundError,
  MissingExternalIdError,
} from '../../../../src/modules/inventory/domain/errors/stock-exit.errors';
import { StockLot } from '../../../../src/modules/inventory/domain/entities/stock-lot.entity';

describe('RegisterStockExitService', () => {
  const buildService = (overrides?: Partial<{
    inventoryItemRepository: InventoryItemRepository;
    unitOfMeasureRepository: UnitOfMeasureRepository;
    stockLotRepository: StockLotRepository;
    stockMovementRepository: StockMovementRepository;
    allocationService: StockExitAllocationService;
  }>) => {
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
      ...overrides?.inventoryItemRepository,
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
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: null,
      }),
      save: jest.fn(),
      ...overrides?.unitOfMeasureRepository,
    };
    const stockLotRepository: StockLotRepository = {
      findByLotNumber: jest.fn(),
      findByLotNumbers: jest.fn().mockResolvedValue([]),
      listAvailableLots: jest.fn().mockResolvedValue([]),
      listByItemId: jest.fn().mockResolvedValue([]),
      save: jest.fn(),
      incrementQuantity: jest.fn(),
      decrementLots: jest.fn(),
      ...overrides?.stockLotRepository,
    };
    const stockMovementRepository: StockMovementRepository = {
      save: jest.fn(),
      saveAll: jest.fn(),
      listByFilters: jest.fn(),
      ...overrides?.stockMovementRepository,
    };
    const allocationService = overrides?.allocationService ?? new StockExitAllocationService();

    return {
      service: new RegisterStockExitService(
        inventoryItemRepository,
        unitOfMeasureRepository,
        stockLotRepository,
        stockMovementRepository,
        allocationService
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
        quantity: 1,
        movementSource: 'INVALID',
        occurredAt: new Date(),
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(InvalidMovementSourceError);
  });

  it('should require externalId', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        businessUnitId: 'bu-1',
        itemId: 'item-1',
        quantity: 1,
        movementSource: 'SALES_ORDER',
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
        quantity: 1,
        movementSource: 'INVENTORY_ADJUSTMENT',
        occurredAt: new Date(),
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(InventoryItemNotFoundError);
  });

  it('should reject allocation sum mismatch', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        businessUnitId: 'bu-1',
        itemId: 'item-1',
        quantity: 10,
        movementSource: 'INVENTORY_ADJUSTMENT',
        occurredAt: new Date(),
        createdBy: 'user-1',
        lotAllocations: [{ lotNumber: 'LOT-1', quantity: 5 }],
      })
    ).rejects.toBeInstanceOf(AllocationSumMismatchError);
  });

  it('should reject missing lot', async () => {
    const { service, stockLotRepository } = buildService();
    (stockLotRepository.findByLotNumbers as jest.Mock).mockResolvedValue([]);

    await expect(
      service.execute({
        businessUnitId: 'bu-1',
        itemId: 'item-1',
        quantity: 5,
        movementSource: 'INVENTORY_ADJUSTMENT',
        occurredAt: new Date(),
        createdBy: 'user-1',
        lotAllocations: [{ lotNumber: 'LOT-1', quantity: 5 }],
      })
    ).rejects.toBeInstanceOf(LotNotFoundError);
  });

  it('should reject insufficient balance', async () => {
    const { service, stockLotRepository } = buildService();
    (stockLotRepository.findByLotNumbers as jest.Mock).mockResolvedValue([
      StockLot.restore({
        id: 'lot-1',
        businessUnitId: 'bu-1',
        itemId: 'item-1',
        lotNumber: 'LOT-1',
        expiresAt: new Date('2026-12-31T00:00:00.000Z'),
        quantityAvailable: 2,
        firstEntryAt: new Date(),
      }),
    ]);

    await expect(
      service.execute({
        businessUnitId: 'bu-1',
        itemId: 'item-1',
        quantity: 5,
        movementSource: 'INVENTORY_ADJUSTMENT',
        occurredAt: new Date('2026-01-01T00:00:00.000Z'),
        createdBy: 'user-1',
        lotAllocations: [{ lotNumber: 'LOT-1', quantity: 5 }],
      })
    ).rejects.toBeInstanceOf(LotInsufficientBalanceError);
  });
});
