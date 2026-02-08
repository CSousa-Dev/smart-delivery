import { CartDomainEvent } from '../../domain/events/cart-domain-event';

export interface CartEventPublisher {
  publish(events: CartDomainEvent[]): Promise<void>;
}
