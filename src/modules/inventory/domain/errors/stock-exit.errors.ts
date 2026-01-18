import { DomainError } from './domain.error';

export class InventoryItemNotFoundError extends DomainError {
  constructor(itemId: string) {
    super('Inventory item not found', 'INVENTORY_ITEM_NOT_FOUND', { itemId });
  }
}

export class InvalidQuantityError extends DomainError {
  constructor(quantity: number) {
    super('Invalid quantity', 'INVALID_QUANTITY', { quantity });
  }
}

export class FractionNotAllowedError extends DomainError {
  constructor(quantity: number) {
    super('Fraction not allowed for unit of measure', 'FRACTION_NOT_ALLOWED', { quantity });
  }
}

export class InvalidMovementSourceError extends DomainError {
  constructor(source: string) {
    super('Invalid movement source', 'INVALID_MOVEMENT_SOURCE', { source });
  }
}

export class MissingExternalIdError extends DomainError {
  constructor() {
    super('External id is required', 'MISSING_EXTERNAL_ID');
  }
}

export class AllocationSumMismatchError extends DomainError {
  constructor(total: number, expected: number) {
    super('Allocation sum mismatch', 'ALLOCATION_SUM_MISMATCH', { total, expected });
  }
}

export class LotNotFoundError extends DomainError {
  constructor(lotNumber: string) {
    super('Lot not found', 'LOT_NOT_FOUND', { lotNumber });
  }
}

export class LotItemMismatchError extends DomainError {
  constructor(lotNumber: string, itemId: string) {
    super('Lot does not belong to item', 'LOT_ITEM_MISMATCH', { lotNumber, itemId });
  }
}

export class LotExpiredError extends DomainError {
  constructor(lotNumber: string) {
    super('Lot is expired', 'LOT_EXPIRED', { lotNumber });
  }
}

export class LotInsufficientBalanceError extends DomainError {
  constructor(lotNumber: string) {
    super('Lot has insufficient balance', 'LOT_INSUFFICIENT_BALANCE', { lotNumber });
  }
}

export class InsufficientStockError extends DomainError {
  constructor(itemId: string) {
    super('Insufficient stock', 'INSUFFICIENT_STOCK', { itemId });
  }
}

export class NoValidLotsError extends DomainError {
  constructor(itemId: string) {
    super('No valid lots for exit', 'NO_VALID_LOTS', { itemId });
  }
}
