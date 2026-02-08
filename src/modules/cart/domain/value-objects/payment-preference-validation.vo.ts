import { CartPaymentMethod } from '../entities/cart-payment-method.enum';

export class PaymentPreferenceValidation {
  constructor(
    public readonly paymentPreferenceId: string,
    public readonly customerId: string,
    public readonly isValid: boolean,
    public readonly method?: CartPaymentMethod,
    public readonly reason?: string
  ) {}
}
