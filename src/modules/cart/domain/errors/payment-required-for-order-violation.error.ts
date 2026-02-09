import { DomainError } from '../../../../shared/errors/domain.error';
import { CartPaymentMethod } from '../entities/cart-payment-method.enum';

export class PaymentRequiredForOrderViolationError extends DomainError {
  constructor(paymentMethod?: CartPaymentMethod | null) {
    super('PAYMENT_REQUIRED_FOR_ORDER', {
      paymentMethod: paymentMethod ?? null,
    });
  }
}
