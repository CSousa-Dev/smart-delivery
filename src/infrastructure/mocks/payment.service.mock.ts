import { PaymentService, PaymentQuoteRequest } from '../../modules/cart/domain/ports/payment.service';
import { PaymentReceipt } from '../../modules/cart/domain/value-objects/payment-receipt.vo';
import { PaymentQuote } from '../../modules/cart/domain/value-objects/payment-quote.vo';
import { PaymentPreferenceValidation } from '../../modules/cart/domain/value-objects/payment-preference-validation.vo';
import { CartPaymentMethod } from '../../modules/cart/domain/entities/cart-payment-method.enum';

function resolveMethod(paymentPreferenceId: string): CartPaymentMethod {
  return paymentPreferenceId.toLowerCase().includes('offline')
    ? CartPaymentMethod.OFFLINE
    : CartPaymentMethod.ONLINE;
}

export class PaymentServiceMock implements PaymentService {
  async getReceipt(cartId: string, paymentId: string): Promise<PaymentReceipt> {
    return new PaymentReceipt(cartId, paymentId, 0, true, new Date());
  }

  async validatePaymentPreference(
    customerId: string,
    paymentPreferenceId: string
  ): Promise<PaymentPreferenceValidation> {
    return new PaymentPreferenceValidation(
      paymentPreferenceId,
      customerId,
      true,
      resolveMethod(paymentPreferenceId)
    );
  }

  async createQuote(input: PaymentQuoteRequest): Promise<PaymentQuote> {
    const method = resolveMethod(input.paymentPreferenceId);
    return new PaymentQuote(`quote-${input.cartId}`, method);
  }

  async deleteQuote(_quoteId: string): Promise<void> {
    return;
  }
}
