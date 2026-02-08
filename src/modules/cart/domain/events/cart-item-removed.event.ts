import { CartDomainEvent } from './cart-domain-event';

export class CartItemRemovedEvent implements CartDomainEvent {
  readonly name = 'CartItemRemoved';

  constructor(
    public readonly cartId: string,
    public readonly itemId: string,
    public readonly occurredAt: Date = new Date()
  ) {}
}
