import { CartDomainEvent } from './cart-domain-event';

export class CartItemAddedEvent implements CartDomainEvent {
  readonly name = 'CartItemAdded';

  constructor(
    public readonly id: string,
    public readonly cartId: string,
    public readonly sku: string,
    public readonly quantity: number,
    public readonly occurredAt: Date = new Date()
  ) {}
}
