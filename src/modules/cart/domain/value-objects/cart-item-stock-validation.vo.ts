export class CartItemStockValidation {
  constructor(
    public readonly sku: string,
    public readonly available: boolean,
    public readonly reason?: string
  ) {}
}
