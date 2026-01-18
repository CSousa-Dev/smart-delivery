export class StockLotPosition {
  constructor(
    public readonly lotNumber: string,
    public readonly quantityAvailable: number,
    public readonly expiresAt: Date | null
  ) {}
}

export class StockPosition {
  constructor(
    public readonly itemId: string,
    public readonly totalAvailable: number,
    public readonly lots: StockLotPosition[]
  ) {}
}
