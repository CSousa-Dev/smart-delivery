import { CartPaymentMethod } from '../entities/cart-payment-method.enum';

export class PaymentContext {
  constructor(
    public readonly method: CartPaymentMethod | null,
    public readonly paymentId: string | null = null,
    public readonly observation: string | null = null
  ) {}

  static empty(): PaymentContext {
    return new PaymentContext(null);
  }

  static withMethod(method: CartPaymentMethod): PaymentContext {
    return new PaymentContext(method);
  }

  withMethod(method: CartPaymentMethod | null): PaymentContext {
    return method ? new PaymentContext(method) : PaymentContext.empty();
  }

  withPaymentId(paymentId: string): PaymentContext {
    return new PaymentContext(this.method, paymentId, this.observation);
  }

  withObservation(observation: string): PaymentContext {
    return new PaymentContext(this.method, this.paymentId, observation);
  }

  hasPaymentId(): boolean {
    return this.paymentId !== null && this.paymentId !== undefined;
  }
}
