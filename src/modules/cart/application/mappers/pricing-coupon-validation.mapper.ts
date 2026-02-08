import { Cart } from '../../domain/entities/cart.entity';
import { CartItem } from '../../domain/entities/cart-item.entity';
import { CartCoupon } from '../../domain/value-objects/cart-coupon.vo';
import {
  PricingCartItemPayload,
  PricingCouponPayload,
  PricingCouponValidationPayload,
} from '../../domain/ports/pricing.service';

export class PricingCouponValidationMapper {
  public static toPayload(
    cart: Cart,
    coupon: CartCoupon
  ): PricingCouponValidationPayload {
    return {
      cartId: cart.id.get(),
      customerId: cart.customerId,
      businessUnitId: cart.businessUnitId,
      verticalId: cart.verticalId,
      paymentPreferenceId: cart.paymentPreferenceId,
      addressId: cart.addressId,
      deliveryPlanId: cart.deliveryPlanId,
      items: cart.cartItems.map((item) => this.mapItem(item)),
      coupons: cart.coupons.map((existingCoupon) => existingCoupon.code),
      candidateCoupon: this.mapCoupon(coupon),
    };
  }

  private static mapItem(item: CartItem): PricingCartItemPayload {
    return {
      id: item.id.get(),
      productCatalogId: item.productCatalogId.get(),
      sku: item.sku,
      description: item.description,
      quantity: item.quantity,
      addons: item.addons,
      removals: item.removals,
      businessUnitId: item.businessUnitId,
      verticalId: item.verticalId,
      categories: item.categories,
    };
  }

  private static mapCoupon(coupon: CartCoupon): PricingCouponPayload {
    return { code: coupon.code };
  }
}
