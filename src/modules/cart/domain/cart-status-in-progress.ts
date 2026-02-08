import { CartStatus } from './entities/cart-status.enum';

/**
 * Statuses that represent a cart still "in progress" (active).
 * Only one cart in any of these statuses is allowed per customer (enforced by DB constraint).
 * Final statuses (e.g. ABANDONED, or future COMPLETED/CANCELLED) are not included.
 * When adding a new in-progress status here, update the migration unique constraint
 * (unique_active_cart_per_customer) to include it.
 */
export const CART_STATUSES_IN_PROGRESS: CartStatus[] = [
  CartStatus.OPEN,
  CartStatus.CHECKOUT,
  CartStatus.WAITING_PAYMENT,
  CartStatus.PAYMENT_CONFIRMED,
  CartStatus.PAYMENT_MISMATCH,
];

export function isCartStatusInProgress(status: string): boolean {
  return CART_STATUSES_IN_PROGRESS.includes(status as CartStatus);
}
