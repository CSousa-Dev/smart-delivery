import { VerticalEventPublisher } from '../../application/ports/vertical-event.publisher';
import { VerticalDomainEvent } from '../../domain/events/vertical-domain-event';
import { IEventBus } from '../../../../shared/events';

/**
 * Adapter that publishes vertical domain events to the shared in-app event bus.
 */
export class VerticalEventPublisherAdapter implements VerticalEventPublisher {
  constructor(private readonly eventBus: IEventBus) {}

  async publish(events: VerticalDomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.eventBus.publish(event as unknown as { name: string; [key: string]: unknown });
    }
  }
}
