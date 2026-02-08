import { CartStatus } from '../../domain/entities/cart-status.enum';

export type ReopenCartOutputDTO = {
  cartId: string;
  status: CartStatus;
};
