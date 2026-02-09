import { DomainError } from '../../../../shared/errors/domain.error';
import { CartItem } from '../entities/cart-item.entity';

export class ItemQuantityViolationError extends DomainError {
  constructor(item: CartItem, reason: string) {
    super('ITEM_QUANTITY_VIOLATION', {
      itemId: item.id.get(),
      sku: item.sku,
      quantity: item.quantity,
      reason,
    });
  }
}
