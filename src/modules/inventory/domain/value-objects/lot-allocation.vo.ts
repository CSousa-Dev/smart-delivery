export class LotAllocation {
  private constructor(
    public readonly lotId: string,
    public readonly lotNumber: string,
    public readonly quantity: number
  ) {}

  static create(props: { lotId: string; lotNumber: string; quantity: number }): LotAllocation {
    return new LotAllocation(props.lotId, props.lotNumber, props.quantity);
  }
}
