import { CartDomainEvent } from './cart-domain-event';
import { CartStatus } from '../entities/cart-status.enum';

export class CartCreatedEvent implements CartDomainEvent {
  readonly name = 'CartCreated';

  constructor(
    public readonly cartId: string,
    public readonly customerId: string,
    public readonly verticalId: string,
    public readonly businessUnitId: string,
    public readonly status: CartStatus,
    public readonly occurredAt: Date = new Date()
  ) {}
}
