import { Cart } from './cart.entity';
import { CartStatus } from './cart-status.enum';
import { CartItemList } from './cart.item.list.entity';
import { Id } from '../../../../shared/contracts/commons/value-objects/id.vo';
import { BusinessContext } from '../value-objects/business-context.vo';
import { PaymentContext } from '../value-objects/payment-context.vo';
import { DeliveryPlan } from './delivery-plan.entity';
import { CartStatusChange } from './cart-status-change.vo';
import { CartCoupon } from '../value-objects/cart-coupon.vo';
import { InvalidBusinessContextError } from '../errors/invalid-business-context.error';

export class CartBuilder {
  private _cartId = Id.create().get();
  private _status = CartStatus.OPEN;
  private _cartItems = new CartItemList();
  private _businessContext?: BusinessContext;
  private _paymentContext: PaymentContext = PaymentContext.empty();
  private _paymentPreferenceId: string | null = null;
  private _quoteId: string | null = null;
  private _openedAt?: Date;
  private _lastMovementAt?: Date;
  private _closedAt?: Date | null;
  private _addressId: string | null = null;
  private _deliveryPlan: DeliveryPlan | null = null;
  private _statusHistory?: CartStatusChange[];
  private _coupons: CartCoupon[] = [];
  private _emitCreationEvent = false;

  static openCart(customerId: string, verticalId: string, businessUnitId: string): CartBuilder {
    return new CartBuilder()
      .withStatus(CartStatus.OPEN)
      .withOpenedAt(new Date())
      .withLastMovementAt(new Date())
      .withBusinessContext(new BusinessContext(customerId, verticalId, businessUnitId))
      .emitCreationEvent();
  }

  withCartId(cartId: string): this {
    this._cartId = cartId;
    return this;
  }

  withStatus(status: CartStatus): this {
    this._status = status;
    return this;
  }

  withCartItems(cartItems: CartItemList): this {
    this._cartItems = cartItems;
    return this;
  }

  withBusinessContext(businessContext: BusinessContext): this {
    this._businessContext = businessContext;
    return this;
  }

  withPaymentContext(paymentContext: PaymentContext): this {
    this._paymentContext = paymentContext;
    return this;
  }

  withPaymentPreferenceId(paymentPreferenceId: string | null): this {
    this._paymentPreferenceId = paymentPreferenceId;
    return this;
  }

  withQuoteId(quoteId: string | null): this {
    this._quoteId = quoteId;
    return this;
  }

  withDeliveryPlan(deliveryPlan: DeliveryPlan | null): this {
    this._deliveryPlan = deliveryPlan;
    if (deliveryPlan) {
      this._addressId = deliveryPlan.addressId;
    }
    return this;
  }

  withAddressId(addressId: string | null): this {
    this._addressId = addressId;
    if (addressId === null) {
      this._deliveryPlan = null;
    }
    return this;
  }

  withCoupons(coupons: CartCoupon[]): this {
    this._coupons = coupons;
    return this;
  }

  withStatusHistory(statusHistory?: CartStatusChange[]): this {
    this._statusHistory = statusHistory ?? [];
    return this;
  }

  withOpenedAt(date: Date): this {
    this._openedAt = date;
    return this;
  }

  withLastMovementAt(date: Date): this {
    this._lastMovementAt = date;
    return this;
  }

  withClosedAt(date: Date | null): this {
    this._closedAt = date;
    return this;
  }

  emitCreationEvent(): this {
    this._emitCreationEvent = true;
    return this;
  }

  build(): Cart {
    if (!this._businessContext) {
      throw new InvalidBusinessContextError();
    }

    const cart = new Cart(
      this._cartId,
      this._status,
      this._cartItems,
      this._businessContext,
      this._paymentContext,
      this._paymentPreferenceId,
      this._quoteId,
      this._openedAt,
      this._lastMovementAt,
      this._closedAt ?? undefined,
      this._addressId,
      this._deliveryPlan,
      this._coupons,
      this._statusHistory
    );
    if (this._emitCreationEvent) {
      cart.registerCreated();
    }
    return cart;
  }
}
