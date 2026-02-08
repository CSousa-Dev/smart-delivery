import { DomainError } from '../../../../shared/errors/domain.error';
import { CartItem } from '../entities/cart-item.entity';

export class ItemQuantityViolationError extends DomainError {
  constructor(item: CartItem, message: string) {
    super(
      `Item quantity violation, quantity: ${item.quantity}. CAUSE: ${message}`,
      'IMMUTABLE_CART_VIOLATION',
      {
        item,
      }
    );
  }
}
