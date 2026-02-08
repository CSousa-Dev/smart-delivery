export class CartTotals {
  constructor(
    public readonly subtotal: number,
    public readonly discountTotal: number,
    public readonly taxTotal: number,
    public readonly shippingTotal: number,
    public readonly grandTotal: number,
    public readonly currency: string
  ) {}
}
