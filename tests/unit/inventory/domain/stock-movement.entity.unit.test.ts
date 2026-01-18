import { StockMovement } from '../../../../src/modules/inventory/domain/entities/stock-movement.entity';
import {
  InvalidMovementSourceError,
  InvalidQuantityError,
  MissingExternalIdError,
} from '../../../../src/modules/inventory/domain/errors/stock-entry.errors';

describe('StockMovement Entity', () => {
  it('should create entry movement', () => {
    const movement = StockMovement.createEntry({
      businessUnitId: 'bu-1',
      itemId: 'item-1',
      lotNumber: 'LOT-1',
      quantity: 5,
      movementSource: 'INVENTORY_ADJUSTMENT',
      occurredAt: new Date(),
      createdBy: 'user-1',
    });

    expect(movement.getType()).toBe('ENTRY');
    expect(movement.getQuantity()).toBe(5);
  });

  it('should reject invalid quantity', () => {
    expect(() =>
      StockMovement.createEntry({
        businessUnitId: 'bu-1',
        itemId: 'item-1',
        lotNumber: 'LOT-1',
        quantity: 0,
        movementSource: 'INVENTORY_ADJUSTMENT',
        occurredAt: new Date(),
        createdBy: 'user-1',
      })
    ).toThrow(InvalidQuantityError);
  });

  it('should reject invalid movement source', () => {
    expect(() =>
      StockMovement.createEntry({
        businessUnitId: 'bu-1',
        itemId: 'item-1',
        lotNumber: 'LOT-1',
        quantity: 5,
        movementSource: 'INVALID',
        occurredAt: new Date(),
        createdBy: 'user-1',
      })
    ).toThrow(InvalidMovementSourceError);
  });

  it('should require externalId when source is not inventory adjustment', () => {
    expect(() =>
      StockMovement.createEntry({
        businessUnitId: 'bu-1',
        itemId: 'item-1',
        lotNumber: 'LOT-1',
        quantity: 5,
        movementSource: 'PURCHASE_ORDER',
        occurredAt: new Date(),
        createdBy: 'user-1',
      })
    ).toThrow(MissingExternalIdError);
  });
});
