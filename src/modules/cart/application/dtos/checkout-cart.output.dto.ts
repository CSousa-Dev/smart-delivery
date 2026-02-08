import { CartStatus } from '../../domain/entities/cart-status.enum';
import { CartPaymentMethod } from '../../domain/entities/cart-payment-method.enum';

export type CheckoutCartOutputDTO = {
  cartId: string;
  status: CartStatus;
  quoteId: string;
  paymentMethod: CartPaymentMethod;
  orderId?: string;
};
