import { CartStatus } from '../../domain/entities/cart-status.enum';

export type CartCreatedDTO = {
  cartId?: string;
  status: CartStatus;
};

export type CartStatusOutputDTO = {
  cartId: string;
  status: CartStatus;
};
