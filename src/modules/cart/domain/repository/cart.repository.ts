import { Cart } from '../entities/cart.entity';

export interface CartRepository {
  /**
   * Inserts a new cart. Enforces at most one active cart per customer via DB unique constraint.
   * @throws CartAlreadyOpenForCustomerError when unique_active_cart_per_customer constraint is violated (concurrent or duplicate open).
   */
  insertCartEnforcingOneActivePerCustomer(cart: Cart): Promise<string>;
  findById(cartId: string): Promise<Cart | null>;
  findByQuoteId(quoteId: string): Promise<Cart | null>;
  save(cart: Cart): Promise<void>;
  saveMany(carts: Cart[]): Promise<void>;
  findInactiveInProgressBatch(
    cutoffDate: Date,
    limit: number,
    afterId?: string
  ): Promise<Cart[]>;
  /** Returns true if customer has any cart in purchase flow (OPEN, WAITING_PAYMENT, PAYMENT_CONFIRMED, PAYMENT_MISMATCH). Abandoned/Ordered do not block. */
  existsOpenCartForCustomer(customerId: string): Promise<boolean>;
  /** Returns the active cart for customer if any (OPEN, WAITING_PAYMENT, PAYMENT_CONFIRMED, PAYMENT_MISMATCH). */
  findOpenCartForCustomer(customerId: string): Promise<Cart | null>;
}
