import { CartPaymentMethod } from '../entities/cart-payment-method.enum';

export class PaymentQuote {
  constructor(
    public readonly quoteId: string,
    public readonly paymentMethod: CartPaymentMethod
  ) {}
}
