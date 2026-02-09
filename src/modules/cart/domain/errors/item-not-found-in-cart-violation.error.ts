import { DomainError } from '../../../../shared/errors/domain.error';

export class ItemNotFoundInCartViolationError extends DomainError {
  constructor(itemId: string) {
    super('ITEM_NOT_FOUND_IN_CART_VIOLATION', {
      itemId,
    });
  }
}
