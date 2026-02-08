import { DomainError } from '../../../../shared/errors/domain.error';
import { CartPaymentMethod } from '../entities/cart-payment-method.enum';

export class PaymentRequiredForOrderViolationError extends DomainError {
  constructor(paymentMethod?: CartPaymentMethod | null) {
    const hasMethod = paymentMethod !== null && paymentMethod !== undefined;
    super(
      hasMethod
        ? `Payment must be completed before ordering with method: ${paymentMethod}.`
        : 'Payment method must be defined before ordering.',
      'PAYMENT_REQUIRED_FOR_ORDER',
      { paymentMethod: paymentMethod ?? null }
    );
  }
}
