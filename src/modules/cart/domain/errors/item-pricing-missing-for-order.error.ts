import { DomainError } from '../../../../shared/errors/domain.error';

export class ItemPricingMissingForOrderError extends DomainError {
  constructor(itemSku: string, addonSku?: string) {
    super(
      addonSku
        ? `Addon pricing missing for item ${itemSku}, addon ${addonSku}.`
        : `Item pricing missing for item ${itemSku}.`,
      'ITEM_PRICING_MISSING_FOR_ORDER',
      {
        itemSku,
        addonSku,
      }
    );
  }
}
