import { CartCoupon } from './cart-coupon.vo';
import { CartTotals } from './cart-totals.vo';
import { CartItemPricingDetails } from './cart-item-pricing-details.vo';

export class CartPricingDetails {
  constructor(
    public readonly items: CartItemPricingDetails[],
    public readonly totals: CartTotals,
    public readonly appliedCoupons: CartCoupon[]
  ) {}
}
