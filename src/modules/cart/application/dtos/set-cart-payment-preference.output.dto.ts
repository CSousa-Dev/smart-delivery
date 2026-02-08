import { CartPaymentMethod } from '../../domain/entities/cart-payment-method.enum';

export type SetCartPaymentPreferenceOutputDTO = {
  cartId: string;
  paymentPreferenceId: string;
  paymentMethod: CartPaymentMethod;
};
