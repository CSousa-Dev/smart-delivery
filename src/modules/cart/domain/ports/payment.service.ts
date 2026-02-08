import { PaymentReceipt } from '../value-objects/payment-receipt.vo';
import { PaymentQuote } from '../value-objects/payment-quote.vo';
import { PaymentPreferenceValidation } from '../value-objects/payment-preference-validation.vo';

export type PaymentQuoteRequest = {
  cartId: string;
  customerId: string;
  businessUnitId: string;
  verticalId: string;
  paymentPreferenceId: string;
  fulfillmentPlanId: string;
  addressId: string;
  coupons: string[];
};

export interface PaymentService {
  getReceipt(cartId: string, paymentId: string): Promise<PaymentReceipt>;
  validatePaymentPreference(
    customerId: string,
    paymentPreferenceId: string
  ): Promise<PaymentPreferenceValidation>;
  createQuote(input: PaymentQuoteRequest): Promise<PaymentQuote>;
  deleteQuote(quoteId: string): Promise<void>;
}
