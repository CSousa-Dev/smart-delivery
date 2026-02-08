export abstract class AggregateRoot<TEvent> {
  private readonly domainEvents: TEvent[] = [];

  protected addDomainEvent(event: TEvent): void {
    this.domainEvents.push(event);
  }

  public pullDomainEvents(): TEvent[] {
    const events = [...this.domainEvents];
    this.domainEvents.length = 0;
    return events;
  }
}
