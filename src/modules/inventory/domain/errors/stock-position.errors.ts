import { DomainError } from './domain.error';

export class InvalidStockPositionQueryError extends DomainError {
  constructor() {
    super('Invalid stock position query', 'INVALID_STOCK_POSITION_QUERY');
  }
}

export class InventoryItemNotFoundError extends DomainError {
  constructor(itemId: string) {
    super('Inventory item not found', 'INVENTORY_ITEM_NOT_FOUND', { itemId });
  }
}

export class LotNotFoundError extends DomainError {
  constructor(lotNumber: string) {
    super('Lot not found', 'LOT_NOT_FOUND', { lotNumber });
  }
}
