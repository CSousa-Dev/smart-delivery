import {
  PricingCouponValidationPayload,
  PricingService,
} from '../../modules/cart/domain/ports/pricing.service';
import { Cart } from '../../modules/cart/domain/entities/cart.entity';
import { CartPricingDetails } from '../../modules/cart/domain/value-objects/cart-pricing-details.vo';
import { CartTotals } from '../../modules/cart/domain/value-objects/cart-totals.vo';

export class PricingServiceMock implements PricingService {
  async calculatePricing(_cart: Cart): Promise<CartPricingDetails> {
    return new CartPricingDetails([], new CartTotals(0, 0, 0, 0, 0, 'BRL'), []);
  }

  async validateCoupon(_payload: PricingCouponValidationPayload): Promise<void> {
    return;
  }
}
