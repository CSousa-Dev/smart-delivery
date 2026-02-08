import { CartEventPublisher } from '../../application/ports/cart-event.publisher';
import { CartDomainEvent } from '../../domain/events/cart-domain-event';
import { IEventBus } from '../../../../shared/events';

/**
 * Adapter that publishes cart domain events to the shared in-app event bus.
 * Cross-module: other modules can subscribe to event names (e.g. CartCreated)
 * without depending on the cart module.
 */
export class CartEventPublisherAdapter implements CartEventPublisher {
  constructor(private readonly eventBus: IEventBus) {}

  async publish(events: CartDomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.eventBus.publish(event as unknown as { name: string; [key: string]: unknown });
    }
  }
}
