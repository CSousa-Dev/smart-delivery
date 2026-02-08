import { CartStatus } from '../cart-status.enum';
import { CartStatusState, CartOrderValidationContext } from './cart-status.state';
import { ImmutableCartViolationError } from '../../errors/immutable-cart-violation.error';
import { MissingQuoteForPaymentError } from '../../errors/missing-quote-for-payment.error';
import { CartPaymentMethod } from '../cart-payment-method.enum';
import { OnlinePaymentRequiredForWaitingPaymentError } from '../../errors/online-payment-required-for-waiting-payment.error';

export class WaitingPaymentCartState implements CartStatusState {
  readonly status = CartStatus.WAITING_PAYMENT;

  canTransitionTo(status: CartStatus): boolean {
    return (
      status === CartStatus.PAYMENT_CONFIRMED ||
      status === CartStatus.OPEN ||
      status === CartStatus.PAYMENT_MISMATCH ||
      status === CartStatus.ABANDONED
    );
  }

  ensureCanAddItem(): void {
    throw new ImmutableCartViolationError(this.status, 'Cannot add items to a closed cart.');
  }

  ensureCanRemoveItem(): void {
    throw new ImmutableCartViolationError(this.status, 'Cannot remove items to a closed cart.');
  }

  ensureCanUpdateItem(): void {
    throw new ImmutableCartViolationError(this.status, 'Cannot update items in a closed cart.');
  }

  ensureCanSetAddress(): void {
    throw new ImmutableCartViolationError(this.status, 'Cannot change address on a closed cart.');
  }

  ensureCanApplyCoupon(): void {
    throw new ImmutableCartViolationError(this.status, 'Cannot apply coupons to a closed cart.');
  }

  ensureCanRemoveCoupon(): void {
    throw new ImmutableCartViolationError(this.status, 'Cannot remove coupons from a closed cart.');
  }

  ensureCanUpdatePricing(): void {
    throw new ImmutableCartViolationError(
      this.status,
      'Cannot update pricing details on a closed cart.'
    );
  }

  ensureCanRegisterPayment(): void {}

  validateOrder(context: CartOrderValidationContext): void {
    if (!context.quoteId) {
      throw new MissingQuoteForPaymentError();
    }

    if (context.paymentContext.method !== CartPaymentMethod.ONLINE) {
      throw new OnlinePaymentRequiredForWaitingPaymentError(context.paymentContext.method);
    }
  }
}
