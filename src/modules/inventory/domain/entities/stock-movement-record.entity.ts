export class StockMovementRecord {
  constructor(
    public readonly id: string,
    public readonly itemId: string,
    public readonly lotNumber: string,
    public readonly type: string,
    public readonly quantity: number,
    public readonly movementSource: string,
    public readonly externalId: string | null,
    public readonly occurredAt: Date,
    public readonly createdBy: string
  ) {}
}
