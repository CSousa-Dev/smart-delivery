import { Cart } from '../../domain/entities/cart.entity';
import { CartItem } from '../../domain/entities/cart-item.entity';
import { PaymentQuoteItemPayload, PaymentQuoteRequest } from '../../domain/ports/payment.service';

export class PaymentQuoteMapper {
  public static toPayload(cart: Cart): PaymentQuoteRequest {
    return {
      cartId: cart.id.get(),
      customerId: cart.customerId,
      businessUnitId: cart.businessUnitId,
      verticalId: cart.verticalId,
      paymentPreferenceId: cart.paymentPreferenceId!,
      fulfillmentPlanId: cart.deliveryPlanId!,
      addressId: cart.addressId!,
      coupons: cart.coupons.map((coupon) => coupon.code),
      items: cart.cartItems.map((item) => this.mapItem(item)),
    };
  }

  private static mapItem(item: CartItem): PaymentQuoteItemPayload {
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
}
