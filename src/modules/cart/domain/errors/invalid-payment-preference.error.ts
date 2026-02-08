import { DomainError } from '../../../../shared/errors/domain.error';

export class InvalidPaymentPreferenceError extends DomainError {
  constructor(paymentPreferenceId: string, reason?: string) {
    super(
      reason
        ? `Payment preference ${paymentPreferenceId} is invalid: ${reason}.`
        : `Payment preference ${paymentPreferenceId} is invalid.`,
      'PAYMENT_PREFERENCE_INVALID',
      { paymentPreferenceId, reason }
    );
  }
}
