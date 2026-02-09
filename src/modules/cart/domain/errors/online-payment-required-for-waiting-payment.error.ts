import { DomainError } from '../../../../shared/errors/domain.error';

export class OnlinePaymentRequiredForWaitingPaymentError extends DomainError {
  constructor(method: string | null) {
    super('ONLINE_PAYMENT_REQUIRED_FOR_WAITING_PAYMENT', {
      method,
    });
  }
}
