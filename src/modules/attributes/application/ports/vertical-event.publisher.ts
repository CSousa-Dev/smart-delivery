import { VerticalDomainEvent } from '../../domain/events/vertical-domain-event';

export interface VerticalEventPublisher {
  publish(events: VerticalDomainEvent[]): Promise<void>;
}
