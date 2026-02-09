import { DomainError } from '../../../../shared/errors/domain.error';

export class ItemPricingMissingForOrderError extends DomainError {
  constructor(itemSku: string, addonSku?: string) {
    super('ITEM_PRICING_MISSING_FOR_ORDER', {
      itemSku,
      addonSku,
    });
  }
}
