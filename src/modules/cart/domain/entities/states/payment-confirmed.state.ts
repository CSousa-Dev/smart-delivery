import { CartStatus } from '../cart-status.enum';
import { CartStatusState, CartOrderValidationContext } from './cart-status.state';
import { ImmutableCartViolationError } from '../../errors/immutable-cart-violation.error';

export class PaymentConfirmedCartState implements CartStatusState {
  readonly status = CartStatus.PAYMENT_CONFIRMED;

  canTransitionTo(status: CartStatus): boolean {
    return status === CartStatus.ORDERED;
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
    throw new ImmutableCartViolationError(this.status, 'Cannot update pricing details on a closed cart.');
  }

  ensureCanRegisterPayment(): void {
    throw new ImmutableCartViolationError(this.status, 'Cannot register payment on a closed cart.');
  }

  validateOrder(_context: CartOrderValidationContext): void {}
}
