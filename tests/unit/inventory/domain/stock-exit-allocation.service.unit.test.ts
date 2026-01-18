import { StockExitAllocationService } from '../../../../src/modules/inventory/domain/services/stock-exit-allocation.service';
import { StockLot } from '../../../../src/modules/inventory/domain/entities/stock-lot.entity';
import { InsufficientStockError, NoValidLotsError } from '../../../../src/modules/inventory/domain/errors/stock-exit.errors';

describe('StockExitAllocationService', () => {
  const service = new StockExitAllocationService();

  const createLot = (props: {
    id: string;
    lotNumber: string;
    quantity: number;
    expiresAt: Date | null;
    firstEntryAt: Date;
  }) =>
    StockLot.restore({
      id: props.id,
      businessUnitId: 'bu-1',
      itemId: 'item-1',
      lotNumber: props.lotNumber,
      expiresAt: props.expiresAt,
      quantityAvailable: props.quantity,
      firstEntryAt: props.firstEntryAt,
    });

  it('should allocate by FEFO when requires expiration', () => {
    const lots = [
      createLot({
        id: 'lot-1',
        lotNumber: 'LOT-2',
        quantity: 5,
        expiresAt: new Date('2026-02-01T00:00:00.000Z'),
        firstEntryAt: new Date('2026-01-01T00:00:00.000Z'),
      }),
      createLot({
        id: 'lot-2',
        lotNumber: 'LOT-1',
        quantity: 5,
        expiresAt: new Date('2026-01-15T00:00:00.000Z'),
        firstEntryAt: new Date('2026-01-02T00:00:00.000Z'),
      }),
    ];

    const allocations = service.allocate({
      lots,
      quantity: 3,
      occurredAt: new Date('2026-01-10T00:00:00.000Z'),
      requiresExpiration: true,
      itemId: 'item-1',
    });

    expect(allocations).toHaveLength(1);
    expect(allocations[0]!.lotNumber).toBe('LOT-1');
  });

  it('should allocate by FIFO when does not require expiration', () => {
    const lots = [
      createLot({
        id: 'lot-1',
        lotNumber: 'LOT-2',
        quantity: 5,
        expiresAt: null,
        firstEntryAt: new Date('2026-01-02T00:00:00.000Z'),
      }),
      createLot({
        id: 'lot-2',
        lotNumber: 'LOT-1',
        quantity: 5,
        expiresAt: null,
        firstEntryAt: new Date('2026-01-01T00:00:00.000Z'),
      }),
    ];

    const allocations = service.allocate({
      lots,
      quantity: 3,
      occurredAt: new Date('2026-01-10T00:00:00.000Z'),
      requiresExpiration: false,
      itemId: 'item-1',
    });

    expect(allocations).toHaveLength(1);
    expect(allocations[0]!.lotNumber).toBe('LOT-1');
  });

  it('should reject when no valid lots', () => {
    const lots = [
      createLot({
        id: 'lot-1',
        lotNumber: 'LOT-1',
        quantity: 5,
        expiresAt: new Date('2025-12-01T00:00:00.000Z'),
        firstEntryAt: new Date('2025-01-01T00:00:00.000Z'),
      }),
    ];

    expect(() =>
      service.allocate({
        lots,
        quantity: 3,
        occurredAt: new Date('2026-01-10T00:00:00.000Z'),
        requiresExpiration: true,
        itemId: 'item-1',
      })
    ).toThrow(NoValidLotsError);
  });

  it('should reject when insufficient stock', () => {
    const lots = [
      createLot({
        id: 'lot-1',
        lotNumber: 'LOT-1',
        quantity: 2,
        expiresAt: new Date('2026-02-01T00:00:00.000Z'),
        firstEntryAt: new Date('2026-01-01T00:00:00.000Z'),
      }),
    ];

    expect(() =>
      service.allocate({
        lots,
        quantity: 5,
        occurredAt: new Date('2026-01-10T00:00:00.000Z'),
        requiresExpiration: true,
        itemId: 'item-1',
      })
    ).toThrow(InsufficientStockError);
  });
});
