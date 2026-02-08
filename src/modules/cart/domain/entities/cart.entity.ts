import { Id } from '../../../../shared/contracts/commons/value-objects/id.vo';
import { CartStatus } from './cart-status.enum';
import { CartItemList } from './cart.item.list.entity';
import { CartCoupon } from '../value-objects/cart-coupon.vo';
import { InvalidCartStatusTransitionError } from '../errors/invalid-cart-status-transition.error';
import { DuplicateCouponViolationError } from '../errors/duplicate-coupon-violation.error';
import { CartStatusChange } from './cart-status-change.vo';
import { CartItem } from './cart-item.entity';
import { CartOrderValidationContext, CartStatusState } from './states/cart-status.state';
import { CartStatusStateFactory } from './states/cart-status-state.factory';
import { CartPaymentConfirmedEvent } from '../events/cart-payment-confirmed.event';
import { CartPaymentFailedEvent } from '../events/cart-payment-failed.event';
import { PaymentReceipt } from '../value-objects/payment-receipt.vo';
import { AggregateRoot } from '../../../../shared/contracts/commons/aggregate-root';
import { CartDomainEvent } from '../events/cart-domain-event';
import { CartItemRemovedEvent } from '../events/cart-item-removed.event';
import { BusinessContext } from '../value-objects/business-context.vo';
import { PaymentContext } from '../value-objects/payment-context.vo';
import { DeliveryPlan } from './delivery-plan.entity';
import { CartPaymentMethod } from './cart-payment-method.enum';

export class Cart extends AggregateRoot<CartDomainEvent> {
  private readonly _id: Id;
  private _status: CartStatus;
  private _state: CartStatusState;
  private readonly _statusHistory: CartStatusChange[];
  private readonly _cartItems: CartItemList;
  private readonly _businessContext: BusinessContext;
  private _deliveryPlan: DeliveryPlan | null;
  private readonly _coupons: CartCoupon[];
  private _paymentContext: PaymentContext;
  private _paymentPreferenceId: string | null;
  private _quoteId: string | null;
  private readonly _openedAt: Date;
  private readonly _closedAt: Date | null;
  private _lastMovementAt: Date;

  constructor(
    id: string,
    status: CartStatus = CartStatus.OPEN,
    cartItems: CartItemList,
    businessContext: BusinessContext,
    paymentContext: PaymentContext = PaymentContext.empty(),
    paymentPreferenceId: string | null = null,
    quoteId: string | null = null,
    openedAt: Date = new Date(),
    lastMovementAt: Date = new Date(),
    closedAt?: Date,
    deliveryPlan?: DeliveryPlan | null,
    coupons: CartCoupon[] = [],
    statusHistory?: CartStatusChange[]
  ) {
    super();
    this._id = Id.create(id);
    this._status = status;
    this._state = CartStatusStateFactory.create(status);
    this._statusHistory =
      statusHistory && statusHistory.length > 0
        ? statusHistory
        : [new CartStatusChange(status, openedAt)];
    this._cartItems = cartItems;
    this._businessContext = businessContext;
    this._paymentContext = paymentContext;
    this._paymentPreferenceId = paymentPreferenceId;
    this._quoteId = quoteId;
    this._deliveryPlan = deliveryPlan ?? null;
    this._coupons = coupons;
    this._openedAt = openedAt;
    this._lastMovementAt = lastMovementAt;
    this._closedAt = closedAt ?? null;

    this._state.validateOrder(this.getOrderValidationContext(null));
  }

  public addItem(item: CartItem): void {
    this._state.ensureCanAddItem();

    this._cartItems.addItem(item);
    this.touch();
  }

  public removeItem(itemId: string): void {
    this._state.ensureCanRemoveItem();

    this._cartItems.removeItem(itemId);
    this.addDomainEvent(new CartItemRemovedEvent(this._id.get(), itemId));
    this.touch();
  }

  public updateItem(item: CartItem): void {
    this._state.ensureCanUpdateItem();

    this.removeItem(item.id.get());
    this.addItem(item);
  }

  public setDeliveryPlan(deliveryPlan: DeliveryPlan): void {
    this._state.ensureCanSetAddress();

    this._deliveryPlan = deliveryPlan;
    this.touch();
  }

  public setPaymentPreference(paymentPreferenceId: string, method: CartPaymentMethod): void {
    this._state.ensureCanUpdatePricing();

    this._paymentPreferenceId = paymentPreferenceId;
    this._quoteId = null;
    this._paymentContext = PaymentContext.withMethod(method);
    this.touch();
  }

  public setQuoteId(quoteId: string): void {
    this._quoteId = quoteId;
    this.touch();
  }

  public clearQuote(): void {
    this._quoteId = null;
    this._paymentContext = this._paymentContext.withMethod(this._paymentContext.method);
    this.touch();
  }

  public addCoupon(coupon: CartCoupon): void {
    this._state.ensureCanApplyCoupon();

    if (this._coupons.some((existingCoupon) => existingCoupon.code === coupon.code)) {
      throw new DuplicateCouponViolationError(coupon.code);
    }

    this._coupons.push(coupon);
    this.touch();
  }

  public removeCoupon(couponCode: string): void {
    this._state.ensureCanRemoveCoupon();

    const index = this._coupons.findIndex((coupon) => coupon.code === couponCode);
    if (index !== -1) {
      this._coupons.splice(index, 1);
    }
    this.touch();
  }

  public markPaymentProcessed(paymentId: string): void {
    this._state.ensureCanRegisterPayment();

    this._paymentContext = this._paymentContext.withPaymentId(paymentId);
    this.touch();
  }

  public confirmPayment(receipt: PaymentReceipt): void {
    this._state.ensureCanRegisterPayment();

    this._paymentContext = this._paymentContext.withPaymentId(receipt.paymentId);
    this.transitionTo(CartStatus.PAYMENT_CONFIRMED);
    this.addDomainEvent(new CartPaymentConfirmedEvent(this._id.get(), receipt));
  }

  public startCheckout(): void {
    this.transitionTo(CartStatus.CHECKOUT);
  }

  public startPayment(): void {
    this.transitionTo(CartStatus.WAITING_PAYMENT);
  }

  public failPayment(reason?: string, paymentId?: string): void {
    const observation = reason ?? 'Payment failed.';
    const pid = paymentId ?? this._paymentContext.paymentId ?? 'unknown';
    this._paymentContext = this._paymentContext
      .withObservation(observation)
      .withPaymentId(pid);
    this.transitionTo(CartStatus.PAYMENT_MISMATCH);
    this.addDomainEvent(new CartPaymentFailedEvent(this._id.get(), pid, observation));
  }

  public markOrdered(): void {
    this.transitionTo(CartStatus.ORDERED);
  }

  public reopen(): void {
    this.transitionTo(CartStatus.OPEN);
    this.touch();
  }

  public abandonIfInactive(referenceDate: Date = new Date(), hours = 24): void {
    const canAbandon =
      this._status === CartStatus.OPEN ||
      this._status === CartStatus.CHECKOUT ||
      this._status === CartStatus.WAITING_PAYMENT ||
      this._status === CartStatus.PAYMENT_MISMATCH;
    if (!canAbandon) return;

    const inactivityMs = hours * 60 * 60 * 1000;
    if (referenceDate.getTime() - this._lastMovementAt.getTime() >= inactivityMs) {
      this.transitionTo(CartStatus.ABANDONED);
    }
  }

  public retryPayment(): void {
    if (this._status === CartStatus.PAYMENT_MISMATCH) {
      this.clearQuote();
    }
    this.transitionTo(CartStatus.OPEN);
  }

  private transitionTo(status: CartStatus): void {
    if (!this._state.canTransitionTo(status)) {
      throw new InvalidCartStatusTransitionError(this._status, status);
    }

    const nextState = CartStatusStateFactory.create(status);
    nextState.validateOrder(this.getOrderValidationContext(this._status));
    this._status = status;
    this._state = nextState;
    this.recordStatusChange(status, new Date());
    this.touch();
  }

  private getOrderValidationContext(previousStatus: CartStatus | null): CartOrderValidationContext {
    return {
      previousStatus,
      deliveryPlan: this._deliveryPlan,
      paymentPreferenceId: this._paymentPreferenceId,
      quoteId: this._quoteId,
      paymentContext: this._paymentContext,
      cartItems: this._cartItems.getItens(),
    };
  }

  private recordStatusChange(status: CartStatus, changedAt: Date): void {
    if (this._statusHistory.length === 0) {
      const durationMs = changedAt.getTime() - this._openedAt.getTime();
      this._statusHistory.push(new CartStatusChange(status, changedAt, durationMs));
      return;
    }

    const lastStatus = this._statusHistory[this._statusHistory.length - 1];
    if (lastStatus) {
      const durationMs = changedAt.getTime() - lastStatus.changedAt.getTime();
      this._statusHistory[this._statusHistory.length - 1] = new CartStatusChange(
        lastStatus.status,
        lastStatus.changedAt,
        durationMs
      );
    }
    this._statusHistory.push(new CartStatusChange(status, changedAt));
  }

  private touch(): void {
    this._lastMovementAt = new Date();
  }

  get id(): Id {
    return this._id;
  }

  get status(): CartStatus {
    return this._status;
  }

  get statusHistory(): CartStatusChange[] {
    return this._statusHistory;
  }

  public getCurrentStatusChange(): CartStatusChange | null {
    const lastStatus = this._statusHistory[this._statusHistory.length - 1];
    return lastStatus ?? null;
  }

  get cartItems(): CartItem[] {
    return this._cartItems.getItens();
  }

  get businessContext(): BusinessContext {
    return this._businessContext;
  }

  get verticalId(): string {
    return this._businessContext.verticalId;
  }

  get businessUnitId(): string {
    return this._businessContext.businessUnitId;
  }

  get customerId(): string {
    return this._businessContext.customerId;
  }

  get deliveryPlan(): DeliveryPlan | null {
    return this._deliveryPlan;
  }

  get addressId(): string | null {
    return this._deliveryPlan?.addressId ?? null;
  }

  get deliveryPlanId(): string | null {
    return this._deliveryPlan?.planId ?? null;
  }

  get deliveryPrice(): number | null {
    return this._deliveryPlan?.price ?? null;
  }

  get paymentPreferenceId(): string | null {
    return this._paymentPreferenceId;
  }

  get quoteId(): string | null {
    return this._quoteId;
  }

  get coupons(): CartCoupon[] {
    return this._coupons;
  }

  get paymentContext(): PaymentContext {
    return this._paymentContext;
  }

  get paymentMethod(): PaymentContext['method'] {
    return this._paymentContext.method;
  }

  get paymentId(): string | null {
    return this._paymentContext.paymentId;
  }

  get paymentMismatchReason(): string | null {
    return this._paymentContext.observation;
  }

  get openedAt(): Date {
    return this._openedAt;
  }

  get closedAt(): Date | null {
    return this._closedAt;
  }

  get lastMovementAt(): Date {
    return this._lastMovementAt;
  }

}
