import { GetStockPositionService } from '../../../../src/modules/inventory/application/services/get-stock-position.service';
import { InventoryItemRepository } from '../../../../src/modules/inventory/domain/repositories/inventory-item.repository';
import { StockLotRepository } from '../../../../src/modules/inventory/domain/repositories/stock-lot.repository';
import {
  InvalidStockPositionQueryError,
  InventoryItemNotFoundError,
  LotNotFoundError,
} from '../../../../src/modules/inventory/domain/errors/stock-position.errors';
import { StockLot } from '../../../../src/modules/inventory/domain/entities/stock-lot.entity';

describe('GetStockPositionService', () => {
  const buildService = () => {
    const inventoryItemRepository: InventoryItemRepository = {
      existsByNameAndBusinessUnitId: jest.fn(),
      existsById: jest.fn().mockResolvedValue(true),
      findById: jest.fn(),
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

    return {
      service: new GetStockPositionService(inventoryItemRepository, stockLotRepository),
      inventoryItemRepository,
      stockLotRepository,
    };
  };

  it('should reject invalid query', async () => {
    const { service } = buildService();

    await expect(
      service.execute({ businessUnitId: 'bu-1' })
    ).rejects.toBeInstanceOf(InvalidStockPositionQueryError);
  });

  it('should reject when item does not exist', async () => {
    const { service, inventoryItemRepository } = buildService();
    (inventoryItemRepository.existsById as jest.Mock).mockResolvedValue(false);

    await expect(
      service.execute({ businessUnitId: 'bu-1', itemId: 'item-1' })
    ).rejects.toBeInstanceOf(InventoryItemNotFoundError);
  });

  it('should return position by item', async () => {
    const { service, stockLotRepository } = buildService();
    (stockLotRepository.listByItemId as jest.Mock).mockResolvedValue([
      StockLot.restore({
        id: 'lot-1',
        businessUnitId: 'bu-1',
        itemId: 'item-1',
        lotNumber: 'LOT-1',
        expiresAt: null,
        quantityAvailable: 5,
        firstEntryAt: new Date(),
      }),
    ]);

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

  it('should reject when lot not found', async () => {
    const { service, stockLotRepository } = buildService();
    (stockLotRepository.findByLotNumber as jest.Mock).mockResolvedValue(null);

    await expect(
      service.execute({ businessUnitId: 'bu-1', lotNumber: 'LOT-1' })
    ).rejects.toBeInstanceOf(LotNotFoundError);
  });
});
