import { CartEventPublisher } from '../../modules/cart/application/ports/cart-event.publisher';
import { CartDomainEvent } from '../../modules/cart/domain/events/cart-domain-event';

/**
 * Simple in-memory publisher for tests.
 */
export class CartEventPublisherMock implements CartEventPublisher {
  public readonly published: CartDomainEvent[] = [];

  async publish(events: CartDomainEvent[]): Promise<void> {
    this.published.push(...events);
  }
}
