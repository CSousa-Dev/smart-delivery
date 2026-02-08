import { DomainError } from '../../../../shared/errors/domain.error';

export class CartItemQuantityInvalidForOrderError extends DomainError {
  constructor(itemSku: string, quantity: number) {
    super(
      `Item ${itemSku} has invalid quantity for ordering: ${quantity}.`,
      'CART_ITEM_QUANTITY_INVALID_FOR_ORDER',
      {
        itemSku,
        quantity,
      }
    );
  }
}
