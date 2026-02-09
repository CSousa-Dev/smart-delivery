import { DomainError } from '../../../../shared/errors/domain.error';

export class CartItemsRequiredForCheckoutError extends DomainError {
  constructor() {
    super('CART_ITEMS_REQUIRED_FOR_CHECKOUT');
  }
}
