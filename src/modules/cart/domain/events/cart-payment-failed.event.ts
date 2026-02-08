import { CartDomainEvent } from './cart-domain-event';

/**
 * Emitted when a cart payment is rejected/mismatched during processing.
 * Other modules can react (e.g. notify customer, retry, etc.).
 */
export class CartPaymentFailedEvent implements CartDomainEvent {
  readonly name = 'CartPaymentFailed';

  constructor(
    public readonly cartId: string,
    public readonly paymentId: string,
    public readonly reason: string,
    public readonly occurredAt: Date = new Date()
  ) {}
}

