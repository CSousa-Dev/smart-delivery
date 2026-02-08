import { DomainError } from '../../../../shared/errors/domain.error';

export class CartItemsRequiredForOrderError extends DomainError {
  constructor() {
    super('At least one item is required before ordering.', 'CART_ITEMS_REQUIRED_FOR_ORDER');
  }
}
