export class CartItemAddonPricing {
  public readonly total: number;

  constructor(
    public readonly sku: string,
    public readonly unitPrice: number,
    public readonly quantity: number = 1,
    total?: number
  ) {
    this.total = total ?? unitPrice * quantity;
  }
}
