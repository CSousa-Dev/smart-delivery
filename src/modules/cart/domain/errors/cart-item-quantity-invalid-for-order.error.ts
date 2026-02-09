import { DomainError } from '../../../../shared/errors/domain.error';

export class CartItemQuantityInvalidForOrderError extends DomainError {
  constructor(itemSku: string, quantity: number) {
    super('CART_ITEM_QUANTITY_INVALID_FOR_ORDER', {
      itemSku,
      quantity,
    });
  }
}
