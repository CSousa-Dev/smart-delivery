import { ListStockMovementsService } from '../../../../src/modules/inventory/application/services/list-stock-movements.service';
import { StockMovementRepository } from '../../../../src/modules/inventory/domain/repositories/stock-movement.repository';
import {
  InvalidDateRangeError,
  InvalidMovementTypeError,
  InvalidPaginationError,
} from '../../../../src/modules/inventory/domain/errors/stock-movement-list.errors';
import { StockMovementRecord } from '../../../../src/modules/inventory/domain/entities/stock-movement-record.entity';

describe('ListStockMovementsService', () => {
  const buildService = () => {
    const stockMovementRepository: StockMovementRepository = {
      save: jest.fn(),
      saveAll: jest.fn(),
      listByFilters: jest.fn().mockResolvedValue({
        total: 1,
        records: [
          new StockMovementRecord(
            'mov-1',
            'item-1',
            'LOT-1',
            'ENTRY',
            5,
            'INVENTORY_ADJUSTMENT',
            null,
            new Date('2026-01-01T00:00:00.000Z'),
            'user-1'
          ),
        ],
      }),
    };

    return {
      service: new ListStockMovementsService(stockMovementRepository),
      stockMovementRepository,
    };
  };

  it('should reject invalid pagination', async () => {
    const { service } = buildService();

    await expect(
      service.execute({ businessUnitId: 'bu-1', page: 0, pageSize: 50 })
    ).rejects.toBeInstanceOf(InvalidPaginationError);
  });

  it('should reject invalid date range', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        businessUnitId: 'bu-1',
        occurredAtStart: new Date('2026-02-01T00:00:00.000Z'),
        occurredAtEnd: new Date('2026-01-01T00:00:00.000Z'),
      })
    ).rejects.toBeInstanceOf(InvalidDateRangeError);
  });

  it('should reject invalid movement type', async () => {
    const { service } = buildService();

    await expect(
      service.execute({ businessUnitId: 'bu-1', movementType: 'INVALID' })
    ).rejects.toBeInstanceOf(InvalidMovementTypeError);
  });

  it('should list movements', async () => {
    const { service } = buildService();

    const output = await service.execute({ businessUnitId: 'bu-1' });

    expect(output.records).toHaveLength(1);
    expect(output.total).toBe(1);
  });
});
