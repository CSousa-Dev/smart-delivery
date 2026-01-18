import { DomainError } from './domain.error';

export class InventoryItemNotFoundError extends DomainError {
  constructor(itemId: string) {
    super('Inventory item not found', 'INVENTORY_ITEM_NOT_FOUND', { itemId });
  }
}

export class LotItemConflictError extends DomainError {
  constructor(lotNumber: string, itemId: string) {
    super('Lot belongs to a different item', 'LOT_ITEM_CONFLICT', { lotNumber, itemId });
  }
}

export class LotExpirationMismatchError extends DomainError {
  constructor(lotNumber: string) {
    super('Lot expiration does not match', 'LOT_EXPIRATION_MISMATCH', { lotNumber });
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

export class MissingExpirationError extends DomainError {
  constructor(itemId: string) {
    super('Expiration is required for this item', 'MISSING_EXPIRATION', { itemId });
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
