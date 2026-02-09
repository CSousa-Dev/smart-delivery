import { DomainError } from '../../../../shared/errors/domain.error';

export class MissingQuoteForPaymentError extends DomainError {
  constructor() {
    super('QUOTE_ID_REQUIRED_FOR_PAYMENT');
  }
}
