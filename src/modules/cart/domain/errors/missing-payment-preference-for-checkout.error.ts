import { DomainError } from '../../../../shared/errors/domain.error';

export class MissingPaymentPreferenceForCheckoutError extends DomainError {
  constructor() {
    super('Payment preference is required for checkout.', 'PAYMENT_PREFERENCE_REQUIRED_FOR_CHECKOUT');
  }
}
