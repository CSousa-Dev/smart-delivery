import { CartStatus } from '../../domain/entities/cart-status.enum';

export type CheckoutCartOutputDTO = {
  quoteId: string;
  status: CartStatus;
  orderId?: string | null;
};
