import { IEventBus, DomainEventLike } from './event-bus.interface';

type Handler = (event: DomainEventLike) => void | Promise<void>;

/**
 * In-memory event bus for in-process, cross-module events.
 * Use this until an external bus (e.g. RabbitMQ) is adopted;
 * then replace the adapter in infrastructure, not the ports.
 */
export class InMemoryEventBus implements IEventBus {
  private readonly handlersByEvent = new Map<string, Set<Handler>>();

  async publish(event: DomainEventLike): Promise<void> {
    const handlers = this.handlersByEvent.get(event.name);
    if (!handlers || handlers.size === 0) return;

    const promises = Array.from(handlers).map((h) => Promise.resolve(h(event)));
    await Promise.all(promises);
  }

  subscribe(
    eventName: string,
    handler: (event: DomainEventLike) => void | Promise<void>
  ): () => void {
    let set = this.handlersByEvent.get(eventName);
    if (!set) {
      set = new Set();
      this.handlersByEvent.set(eventName, set);
    }
    set.add(handler);

    return () => {
      set?.delete(handler);
    };
  }
}

let defaultBus: IEventBus | null = null;

export function getEventBus(): IEventBus {
  if (!defaultBus) {
    defaultBus = new InMemoryEventBus();
  }
  return defaultBus;
}

export function setEventBus(bus: IEventBus): void {
  defaultBus = bus;
}
