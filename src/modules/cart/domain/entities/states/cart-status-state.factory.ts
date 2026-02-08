import { CartStatus } from '../cart-status.enum';
import { CartStatusState } from './cart-status.state';
import { OpenCartState } from './open-cart.state';
import { CheckoutCartState } from './checkout-cart.state';
import { AbandonedCartState } from './abandoned-cart.state';
import { OrderedCartState } from './ordered-cart.state';
import { WaitingPaymentCartState } from './waiting-payment.state';
import { PaymentMismatchCartState } from './payment-mismatch.state';
import { PaymentConfirmedCartState } from './payment-confirmed.state';

export class CartStatusStateFactory {
  public static create(status: CartStatus): CartStatusState {
    switch (status) {
      case CartStatus.OPEN:
        return new OpenCartState();
      case CartStatus.CHECKOUT:
        return new CheckoutCartState();
      case CartStatus.WAITING_PAYMENT:
        return new WaitingPaymentCartState();
      case CartStatus.PAYMENT_CONFIRMED:
        return new PaymentConfirmedCartState();
      case CartStatus.PAYMENT_MISMATCH:
        return new PaymentMismatchCartState();
      case CartStatus.ABANDONED:
        return new AbandonedCartState();
      case CartStatus.ORDERED:
        return new OrderedCartState();
      default:
        return new OpenCartState();
    }
  }
}
