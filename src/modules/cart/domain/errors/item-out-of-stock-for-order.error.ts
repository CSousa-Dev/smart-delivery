import { DomainError } from '../../../../shared/errors/domain.error';

export class ItemOutOfStockForOrderError extends DomainError {
  constructor(itemSku: string, reason?: string) {
    super('ITEM_OUT_OF_STOCK_FOR_ORDER', {
      itemSku,
      reason,
    });
  }
}
