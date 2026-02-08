import { CartItem } from '../entities/cart-item.entity';
import { CartItemAddonPricing } from './cart-item-addon-pricing';

export class CartItemPricingDetails {
  constructor(
    public readonly item: CartItem,
    public readonly basePrice: number,
    public readonly addonsTotal: number,
    public readonly itemTotal: number,
    public readonly addons: CartItemAddonPricing[] = []
  ) {}
}
