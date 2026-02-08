import { DomainError } from '../../../../shared/errors/domain.error';

export class MissingQuoteForPaymentError extends DomainError {
  constructor() {
    super('Quote id is required before waiting for payment.', 'QUOTE_ID_REQUIRED_FOR_PAYMENT');
  }
}
