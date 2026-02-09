import { DomainError } from '../../../../shared/errors/domain.error';

export class CartItemsRequiredForOrderError extends DomainError {
  constructor() {
    super('CART_ITEMS_REQUIRED_FOR_ORDER');
  }
}
