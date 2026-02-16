import { getEventBus } from '../../../../shared/events';
import { VerticalEventPublisherAdapter } from '../events/vertical-event-publisher.adapter';

export function createAttributesAdapters() {
  const eventBus = getEventBus();
  return {
    verticalEventPublisher: new VerticalEventPublisherAdapter(eventBus),
  };
}
