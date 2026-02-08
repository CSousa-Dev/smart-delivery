import { CartRepository } from '../../domain/repository/cart.repository';
import { StartCartPaymentInputDTO } from '../dtos/start-cart-payment.input.dto';
import { CartStatusOutputDTO } from '../dtos/cart-status.output.dto';
import { CartNotFoundError } from '../errors/cart-not-found.error';
import { CartOwnerMismatchError } from '../errors/cart-owner-mismatch.error';

export class StartCartPaymentService {
  constructor(private readonly cartRepository: CartRepository) {}

  public async execute(input: StartCartPaymentInputDTO): Promise<CartStatusOutputDTO> {
    const cart = await this.cartRepository.findById(input.cartId);
    if (!cart) {
      throw new CartNotFoundError(input.cartId);
    }
    if (cart.customerId !== input.actorUserId) {
      throw new CartOwnerMismatchError(input.actorUserId, cart.id.get());
    }

    cart.startPayment();
    await this.cartRepository.save(cart);
    return { cartId: input.cartId, status: cart.status };
  }
}
