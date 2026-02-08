import { CartRepository } from '../../domain/repository/cart.repository';
import { RemoveCartItemInputDTO } from '../dtos/remove-cart-item.input.dto';
import { CartStatusOutputDTO } from '../dtos/cart-status.output.dto';
import { CartNotFoundError } from '../errors/cart-not-found.error';
import { CartOwnerMismatchError } from '../errors/cart-owner-mismatch.error';

export class RemoveCartItemService {
  constructor(private readonly cartRepository: CartRepository) {}

  public async execute(input: RemoveCartItemInputDTO): Promise<CartStatusOutputDTO> {
    const cart = await this.cartRepository.findById(input.cartId);
    if (!cart) {
      throw new CartNotFoundError(input.cartId);
    }
    if (cart.customerId !== input.actorUserId) {
      throw new CartOwnerMismatchError(input.actorUserId, cart.id.get());
    }

    cart.removeItem(input.itemId);
    await this.cartRepository.save(cart);
    return { cartId: input.cartId, status: cart.status };
  }
}
