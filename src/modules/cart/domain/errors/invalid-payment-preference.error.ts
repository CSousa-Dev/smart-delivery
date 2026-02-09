import { DomainError } from '../../../../shared/errors/domain.error';

export class InvalidPaymentPreferenceError extends DomainError {
  constructor(paymentPreferenceId: string, reason?: string) {
    super('PAYMENT_PREFERENCE_INVALID', {
      paymentPreferenceId,
      reason,
    });
  }
}
