import { CartItemInputDTO } from './cart-item.input.dto';

export type UpdateCartItemInputDTO = {
  cartId: string;
  item: CartItemInputDTO & { id: string };
  actorUserId: string;
};
