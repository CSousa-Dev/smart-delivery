import { Cart } from '../../../domain/entities/cart.entity';
import { CartBuilder } from '../../../domain/entities/cart.builder';
import { CartStatus } from '../../../domain/entities/cart-status.enum';
import { CartItem } from '../../../domain/entities/cart-item.entity';
import { CartItemList } from '../../../domain/entities/cart.item.list.entity';
import { CartStatusChange } from '../../../domain/entities/cart-status-change.vo';
import { DeliveryPlan } from '../../../domain/entities/delivery-plan.entity';
import { CartPaymentMethod } from '../../../domain/entities/cart-payment-method.enum';
import { PaymentContext } from '../../../domain/value-objects/payment-context.vo';
import { CartCoupon } from '../../../domain/value-objects/cart-coupon.vo';
import { BusinessContext } from '../../../domain/value-objects/business-context.vo';
import { Id } from '../../../../../shared/contracts/commons/value-objects/id.vo';
import { AddonDTO } from '../../../../../shared/contracts/item/addon/addon.dto';
import { RemovalDTO } from '../../../../../shared/contracts/item/removals/removal.dto';

type StatusHistoryRow = { status: string; changedAt: Date; durationMs?: number | null };
type CartItemRow = {
  id: string;
  productCatalogId: string;
  sku: string;
  description: string;
  quantity: number;
  addons: { id: string; sku: string; additionalDescription?: string; quantity: number }[];
  removals: { sku: string }[];
  businessUnitId: string;
  verticalId: string;
  categories: string[];
};
type CartCouponRow = { code: string };

export class CartMapper {
  static toPersistence(cart: Cart): {
    id: string;
    customerId: string;
    verticalId: string;
    businessUnitId: string;
    status: string;
    openedAt: Date;
    lastMovementAt: Date;
    closedAt: Date | null;
    paymentMethod: string | null;
    paymentId: string | null;
    paymentObservation: string | null;
    paymentPreferenceId: string | null;
    quoteId: string | null;
    deliveryPlanId: string | null;
    deliveryAddressId: string | null;
    deliveryPrice: number | null;
    items: CartItemRow[] | null;
    coupons: CartCouponRow[] | null;
    statusHistory: StatusHistoryRow[] | null;
  } {
    const statusHistory = cart.statusHistory.length
      ? cart.statusHistory.map((h) => ({
          status: h.status,
          changedAt: h.changedAt,
          durationMs: h.durationMs ?? null,
        }))
      : null;
    const items = cart.cartItems.length
      ? cart.cartItems.map((item) => ({
          id: item.id.get(),
          productCatalogId: item.productCatalogId.get(),
          sku: item.sku,
          description: item.description,
          quantity: item.quantity,
          addons: item.addons.map((addon) => ({
            id: addon.id.get(),
            sku: addon.sku,
            ...(addon.additionalDescription !== undefined && {
              additionalDescription: addon.additionalDescription,
            }),
            quantity: addon.quantity,
          })),
          removals: item.removals.map((removal) => ({ sku: removal.sku })),
          businessUnitId: item.businessUnitId,
          verticalId: item.verticalId,
          categories: item.categories,
        }))
      : null;
    const coupons = cart.coupons.length
      ? cart.coupons.map((coupon) => ({ code: coupon.code }))
      : null;

    return {
      id: cart.id.get(),
      customerId: cart.customerId,
      verticalId: cart.verticalId,
      businessUnitId: cart.businessUnitId,
      status: cart.status,
      openedAt: cart.openedAt,
      lastMovementAt: cart.lastMovementAt,
      closedAt: cart.closedAt,
      paymentMethod: cart.paymentMethod ?? null,
      paymentId: cart.paymentId ?? null,
      paymentObservation: cart.paymentMismatchReason ?? null,
      paymentPreferenceId: cart.paymentPreferenceId ?? null,
      quoteId: cart.quoteId ?? null,
      deliveryPlanId: cart.deliveryPlanId ?? null,
      deliveryAddressId: cart.addressId ?? null,
      deliveryPrice: cart.deliveryPrice ?? null,
      items,
      coupons,
      statusHistory,
    };
  }

  static fromPersistence(data: {
    id: string;
    customerId: string;
    verticalId: string;
    businessUnitId: string;
    status: string;
    openedAt: Date;
    lastMovementAt: Date;
    closedAt: Date | null;
    paymentMethod: string | null;
    paymentId: string | null;
    paymentObservation: string | null;
    paymentPreferenceId: string | null;
    quoteId: string | null;
    deliveryPlanId: string | null;
    deliveryAddressId: string | null;
    deliveryPrice: number | null;
    items: CartItemRow[] | null;
    coupons: CartCouponRow[] | null;
    statusHistory: StatusHistoryRow[] | null;
  }): Cart {
    const items = (data.items ?? []).map((item) =>
      new CartItem(
        Id.create(item.id),
        Id.create(item.productCatalogId),
        item.sku,
        item.description,
        item.quantity,
        (item.addons ?? []).map(
          (addon) =>
            new AddonDTO(
              Id.create(addon.id),
              addon.sku,
              addon.additionalDescription,
              addon.quantity
            )
        ),
        (item.removals ?? []).map((removal) => new RemovalDTO(removal.sku)),
        item.businessUnitId,
        item.verticalId,
        item.categories ?? []
      )
    );
    const cartItems = new CartItemList(items);
    const deliveryPlan =
      data.deliveryPlanId && data.deliveryAddressId
        ? new DeliveryPlan(
            data.deliveryPlanId,
            data.deliveryAddressId,
            data.deliveryPrice ?? 0
          )
        : null;
    const paymentContext = data.paymentMethod
      ? new PaymentContext(
          data.paymentMethod as CartPaymentMethod,
          data.paymentId ?? null,
          data.paymentObservation ?? null
        )
      : PaymentContext.empty();
    const statusHistory = (data.statusHistory ?? []).map(
      (entry) =>
        new CartStatusChange(entry.status as CartStatus, entry.changedAt, entry.durationMs ?? undefined)
    );
    const coupons = (data.coupons ?? []).map((coupon) => new CartCoupon(coupon.code));

    return new CartBuilder()
      .withCartId(data.id)
      .withStatus(data.status as CartStatus)
      .withCartItems(cartItems)
      .withBusinessContext(
        new BusinessContext(data.customerId, data.verticalId, data.businessUnitId)
      )
      .withPaymentContext(paymentContext)
      .withPaymentPreferenceId(data.paymentPreferenceId ?? null)
      .withQuoteId(data.quoteId ?? null)
      .withAddressId(data.deliveryAddressId ?? null)
      .withDeliveryPlan(deliveryPlan)
      .withCoupons(coupons)
      .withOpenedAt(data.openedAt)
      .withLastMovementAt(data.lastMovementAt)
      .withClosedAt(data.closedAt)
      .withStatusHistory(statusHistory.length ? statusHistory : undefined)
      .build();
  }
}
