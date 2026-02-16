import { VerticalDomainEvent } from './vertical-domain-event';

export class VerticalActivatedEvent implements VerticalDomainEvent {
  readonly name = 'VerticalActivated';

  constructor(
    public readonly verticalId: string,
    public readonly code: string,
    public readonly verticalName: string,
    public readonly occurredAt: Date = new Date()
  ) {}
}
