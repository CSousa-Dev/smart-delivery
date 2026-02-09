import { PaymentReceipt } from '../value-objects/payment-receipt.vo';
import { PaymentQuote } from '../value-objects/payment-quote.vo';
import { PaymentPreferenceValidation } from '../value-objects/payment-preference-validation.vo';
import { AddonDTO } from '../../../../shared/contracts/item/addon/addon.dto';
import { RemovalDTO } from '../../../../shared/contracts/item/removals/removal.dto';

export type PaymentQuoteRequest = {
  cartId: string;
  customerId: string;
  businessUnitId: string;
  verticalId: string;
  paymentPreferenceId: string;
  fulfillmentPlanId: string;
  addressId: string;
  coupons: string[];
  items: PaymentQuoteItemPayload[];
};

export type PaymentQuoteItemPayload = {
  id: string;
  productCatalogId: string;
  sku: string;
  description: string;
  quantity: number;
  addons: AddonDTO[];
  removals: RemovalDTO[];
  businessUnitId: string;
  verticalId: string;
  categories: string[];
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
