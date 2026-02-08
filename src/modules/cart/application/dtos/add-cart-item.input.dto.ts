import { CartItemInputDTO } from './cart-item.input.dto';

export type AddCartItemInputDTO = {
  cartId: string;
  item: CartItemInputDTO;
  actorUserId: string;
};
