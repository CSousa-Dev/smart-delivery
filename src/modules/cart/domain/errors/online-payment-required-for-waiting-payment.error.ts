import { DomainError } from '../../../../shared/errors/domain.error';

export class OnlinePaymentRequiredForWaitingPaymentError extends DomainError {
  constructor(method: string | null) {
    super(
      `Online payment method is required to wait for payment. Current method: ${method ?? 'null'}.`,
      'ONLINE_PAYMENT_REQUIRED_FOR_WAITING_PAYMENT',
      { method }
    );
  }
}
