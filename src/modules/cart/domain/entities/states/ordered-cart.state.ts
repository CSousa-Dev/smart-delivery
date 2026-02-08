import { CartOrderValidationContext, CartStatusState } from './cart-status.state';
import { CartStatus } from '../cart-status.enum';
import { CartPaymentMethod } from '../cart-payment-method.enum';
import { ImmutableCartViolationError } from '../../errors/immutable-cart-violation.error';
import { MissingAddressForOrderViolationError } from '../../errors/missing-address-for-order-violation.error';
import { PaymentRequiredForOrderViolationError } from '../../errors/payment-required-for-order-violation.error';
import { CartItemsRequiredForOrderError } from '../../errors/cart-items-required-for-order.error';
import { CartItemQuantityInvalidForOrderError } from '../../errors/cart-item-quantity-invalid-for-order.error';

export class OrderedCartState implements CartStatusState {
  readonly status = CartStatus.ORDERED;

  canTransitionTo(_status: CartStatus): boolean {
    return false;
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

  ensureCanRegisterPayment(): void {
    throw new ImmutableCartViolationError(this.status, 'Cannot register payment on a closed cart.');
  }

  validateOrder(context: CartOrderValidationContext): void {
    if (!context.deliveryPlan) {
      throw new MissingAddressForOrderViolationError(this.status);
    }

    const paymentContext = context.paymentContext;
    if (!paymentContext || !paymentContext.method) {
      throw new PaymentRequiredForOrderViolationError();
    }

    if (paymentContext.method === CartPaymentMethod.ONLINE) {
      if (
        context.previousStatus &&
        context.previousStatus !== CartStatus.WAITING_PAYMENT &&
        context.previousStatus !== CartStatus.PAYMENT_CONFIRMED
      ) {
        throw new PaymentRequiredForOrderViolationError(paymentContext.method);
      }

      if (!paymentContext.paymentId) {
        throw new PaymentRequiredForOrderViolationError(paymentContext.method);
      }
    }

    if (context.cartItems.length === 0) {
      throw new CartItemsRequiredForOrderError();
    }

    for (const item of context.cartItems) {
      if (item.quantity <= 0) {
        throw new CartItemQuantityInvalidForOrderError(item.sku, item.quantity);
      }
    }
  }
}
