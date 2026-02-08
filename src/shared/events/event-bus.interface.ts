/**
 * Contract for the in-app event bus (cross-module).
 * Modules only depend on this interface; infrastructure can swap
 * in-memory implementation for RabbitMQ (or other) later.
 */
export interface DomainEventLike {
  readonly name: string;
  readonly [key: string]: unknown;
}

export interface IEventBus {
  publish(event: DomainEventLike): Promise<void>;
  subscribe(
    eventName: string,
    handler: (event: DomainEventLike) => void | Promise<void>
  ): () => void;
}
