import { CartDomainEvent } from './cart-domain-event';

export class CartPaymentConfirmedEvent implements CartDomainEvent {
  readonly name = 'CartPaymentConfirmed';

  constructor(
    public readonly cartId: string,
    public readonly paymentId: string,
    public readonly occurredAt: Date = new Date()
  ) {}
}
