import { StockLot } from '../../../../src/modules/inventory/domain/entities/stock-lot.entity';
import { InvalidQuantityError } from '../../../../src/modules/inventory/domain/errors/stock-entry.errors';

describe('StockLot Entity', () => {
  it('should create stock lot with valid quantity', () => {
    const lot = StockLot.create({
      businessUnitId: 'bu-1',
      itemId: 'item-1',
      lotNumber: 'LOT-1',
      expiresAt: null,
      quantityAvailable: 10,
      firstEntryAt: new Date('2026-01-01T00:00:00.000Z'),
    });

    expect(lot.getLotNumber()).toBe('LOT-1');
    expect(lot.getQuantityAvailable()).toBe(10);
  });

  it('should reject invalid quantity', () => {
    expect(() =>
      StockLot.create({
        businessUnitId: 'bu-1',
        itemId: 'item-1',
        lotNumber: 'LOT-1',
        expiresAt: null,
        quantityAvailable: 0,
        firstEntryAt: new Date(),
      })
    ).toThrow(InvalidQuantityError);
  });

  it('should increment quantity', () => {
    const lot = StockLot.create({
      businessUnitId: 'bu-1',
      itemId: 'item-1',
      lotNumber: 'LOT-1',
      expiresAt: null,
      quantityAvailable: 10,
      firstEntryAt: new Date(),
    });

    lot.increment(5);

    expect(lot.getQuantityAvailable()).toBe(15);
  });
});
