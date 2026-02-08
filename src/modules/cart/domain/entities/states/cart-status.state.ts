import { CartStatus } from '../cart-status.enum';
import { CartItem } from '../cart-item.entity';
import { DeliveryPlan } from '../delivery-plan.entity';
import { PaymentContext } from '../../value-objects/payment-context.vo';

export type CartOrderValidationContext = {
  previousStatus: CartStatus | null;
  deliveryPlan: DeliveryPlan | null;
  paymentPreferenceId: string | null;
  quoteId: string | null;
  paymentContext: PaymentContext;
  cartItems: CartItem[];
};

export interface CartStatusState {
  readonly status: CartStatus;
  canTransitionTo(status: CartStatus): boolean;
  ensureCanAddItem(): void;
  ensureCanRemoveItem(): void;
  ensureCanUpdateItem(): void;
  ensureCanSetAddress(): void;
  ensureCanApplyCoupon(): void;
  ensureCanRemoveCoupon(): void;
  ensureCanUpdatePricing(): void;
  ensureCanRegisterPayment(): void;
  validateOrder(context: CartOrderValidationContext): void;
}
