export class OrderPaymentReference {
  constructor(
    public readonly quoteId: string,
    public readonly paymentId: string | null
  ) {}
}
