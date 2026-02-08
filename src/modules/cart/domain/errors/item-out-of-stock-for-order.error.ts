import { DomainError } from '../../../../shared/errors/domain.error';

export class ItemOutOfStockForOrderError extends DomainError {
  constructor(itemSku: string, reason?: string) {
    super(
      reason ? `Item ${itemSku} is out of stock: ${reason}.` : `Item ${itemSku} is out of stock.`,
      'ITEM_OUT_OF_STOCK_FOR_ORDER',
      {
        itemSku,
        reason,
      }
    );
  }
}
