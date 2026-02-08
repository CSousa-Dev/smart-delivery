import { DomainError } from '../../../../shared/errors/domain.error';

export class ItemNotFoundInCartViolationError extends DomainError {
  constructor(itemId: string) {
    super('Item not found in cart: ' + itemId, 'ITEM_NOT_FOUND_IN_CART_VIOLATION', {
      itemId,
    });
  }
}
