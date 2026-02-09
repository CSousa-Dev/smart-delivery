import { CartDomainEvent } from './cart-domain-event';
import { CartStatus } from '../entities/cart-status.enum';

/**
 * Emitted when a cart transitions to ABANDONED.
 */
export class CartAbandonedEvent implements CartDomainEvent {
  readonly name = 'CartAbandoned';

  constructor(
    public readonly cartId: string,
    public readonly previousStatus: CartStatus,
    public readonly occurredAt: Date = new Date()
  ) {}
}
