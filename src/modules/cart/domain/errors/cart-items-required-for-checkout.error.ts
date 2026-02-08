import { DomainError } from '../../../../shared/errors/domain.error';

export class CartItemsRequiredForCheckoutError extends DomainError {
  constructor() {
    super('Cart items are required for checkout.', 'CART_ITEMS_REQUIRED_FOR_CHECKOUT');
  }
}
