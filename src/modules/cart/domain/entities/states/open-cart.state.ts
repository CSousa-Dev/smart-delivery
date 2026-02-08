import { CartStatus } from '../cart-status.enum';
import { CartStatusState, CartOrderValidationContext } from './cart-status.state';
import { ImmutableCartViolationError } from '../../errors/immutable-cart-violation.error';

export class OpenCartState implements CartStatusState {
  readonly status = CartStatus.OPEN;

  canTransitionTo(status: CartStatus): boolean {
    return (
      status === CartStatus.ABANDONED || status === CartStatus.CHECKOUT
    );
  }

  ensureCanAddItem(): void {}
  ensureCanRemoveItem(): void {}
  ensureCanUpdateItem(): void {}
  ensureCanSetAddress(): void {}
  ensureCanApplyCoupon(): void {}
  ensureCanRemoveCoupon(): void {}
  ensureCanUpdatePricing(): void {}
  ensureCanRegisterPayment(): void {
    throw new ImmutableCartViolationError(
      this.status,
      'Cannot register payment on a non-payment cart.'
    );
  }
  validateOrder(_context: CartOrderValidationContext): void {}
}
