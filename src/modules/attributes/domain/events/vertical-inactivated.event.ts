import { VerticalDomainEvent } from './vertical-domain-event';

export class VerticalInactivatedEvent implements VerticalDomainEvent {
  readonly name = 'VerticalInactivated';

  constructor(
    public readonly verticalId: string,
    public readonly code: string,
    public readonly verticalName: string,
    public readonly occurredAt: Date = new Date()
  ) {}
}
