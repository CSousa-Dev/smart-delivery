import { CartStatus } from '../cart-status.enum';
import { CartStatusState, CartOrderValidationContext } from './cart-status.state';
import { ImmutableCartViolationError } from '../../errors/immutable-cart-violation.error';
import { MissingPaymentPreferenceForCheckoutError } from '../../errors/missing-payment-preference-for-checkout.error';
import { MissingDeliveryPlanForCheckoutError } from '../../errors/missing-delivery-plan-for-checkout.error';
import { CartItemsRequiredForCheckoutError } from '../../errors/cart-items-required-for-checkout.error';

export class CheckoutCartState implements CartStatusState {
  readonly status = CartStatus.CHECKOUT;

  canTransitionTo(status: CartStatus): boolean {
    return (
      status === CartStatus.WAITING_PAYMENT ||
      status === CartStatus.ORDERED ||
      status === CartStatus.OPEN ||
      status === CartStatus.ABANDONED
    );
  }

  ensureCanAddItem(): void {
    throw new ImmutableCartViolationError(this.status, 'Cannot add items to a checkout cart.');
  }

  ensureCanRemoveItem(): void {
    throw new ImmutableCartViolationError(this.status, 'Cannot remove items from a checkout cart.');
  }

  ensureCanUpdateItem(): void {
    throw new ImmutableCartViolationError(this.status, 'Cannot update items in a checkout cart.');
  }

  ensureCanSetAddress(): void {
    throw new ImmutableCartViolationError(this.status, 'Cannot change address on a checkout cart.');
  }

  ensureCanApplyCoupon(): void {
    throw new ImmutableCartViolationError(this.status, 'Cannot apply coupons to a checkout cart.');
  }

  ensureCanRemoveCoupon(): void {
    throw new ImmutableCartViolationError(this.status, 'Cannot remove coupons from a checkout cart.');
  }

  ensureCanUpdatePricing(): void {
    throw new ImmutableCartViolationError(
      this.status,
      'Cannot update pricing details on a checkout cart.'
    );
  }

  ensureCanRegisterPayment(): void {}

  validateOrder(context: CartOrderValidationContext): void {
    if (!context.paymentPreferenceId) {
      throw new MissingPaymentPreferenceForCheckoutError();
    }

    if (!context.deliveryPlan) {
      throw new MissingDeliveryPlanForCheckoutError();
    }

    if (context.cartItems.length === 0) {
      throw new CartItemsRequiredForCheckoutError();
    }
  }
}
