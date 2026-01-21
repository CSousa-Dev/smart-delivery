import { DomainError } from './domain.error';

export class ProductNotFoundError extends DomainError {
  constructor(productId: string) {
    super('Product not found', 'PRODUCT_NOT_FOUND', { productId });
  }
}

export class InventoryItemNotFoundError extends DomainError {
  constructor(itemId: string) {
    super('Inventory item not found', 'INVENTORY_ITEM_NOT_FOUND', { itemId });
  }
}

export class BusinessUnitMismatchError extends DomainError {
  constructor(productId: string, itemId: string) {
    super('Product and item must belong to same business unit', 'PRODUCT_ITEM_BUSINESS_UNIT_MISMATCH', {
      productId,
      itemId,
    });
  }
}

export class ProductAlreadyLinkedError extends DomainError {
  constructor(productId: string) {
    super('Product already linked', 'PRODUCT_ALREADY_LINKED', { productId });
  }
}

export class ItemAlreadyLinkedError extends DomainError {
  constructor(itemId: string) {
    super('Item already linked', 'ITEM_ALREADY_LINKED', { itemId });
  }
}

export class ProductItemLinkNotFoundError extends DomainError {
  constructor(productId: string, itemId: string) {
    super('Product item link not found', 'PRODUCT_ITEM_LINK_NOT_FOUND', {
      productId,
      itemId,
    });
  }
}

export class LinkAlreadyInactiveError extends DomainError {
  constructor() {
    super('Link already inactive', 'LINK_ALREADY_INACTIVE');
  }
}
