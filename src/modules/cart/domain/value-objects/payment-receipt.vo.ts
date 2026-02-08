export class PaymentReceipt {
  constructor(
    public readonly cartId: string,
    public readonly paymentId: string,
    public readonly amount: number,
    public readonly approved: boolean,
    public readonly paidAt: Date
  ) {}
}
