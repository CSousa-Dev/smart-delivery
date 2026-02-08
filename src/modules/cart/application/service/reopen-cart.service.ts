import { CartRepository } from '../../domain/repository/cart.repository';
import { PaymentService } from '../../domain/ports/payment.service';
import { ReopenCartInputDTO } from '../dtos/reopen-cart.input.dto';
import { ReopenCartOutputDTO } from '../dtos/reopen-cart.output.dto';
import { CartNotFoundError } from '../errors/cart-not-found.error';
import { CartOwnerMismatchError } from '../errors/cart-owner-mismatch.error';

export class ReopenCartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly paymentService: PaymentService
  ) {}

  public async execute(input: ReopenCartInputDTO): Promise<ReopenCartOutputDTO> {
    const cart = await this.cartRepository.findById(input.cartId);
    if (!cart) {
      throw new CartNotFoundError(input.cartId);
    }
    if (cart.customerId !== input.actorUserId) {
      throw new CartOwnerMismatchError(input.actorUserId, cart.id.get());
    }

    if (cart.quoteId) {
      await this.paymentService.deleteQuote(cart.quoteId);
      cart.clearQuote();
    }

    cart.reopen();
    await this.cartRepository.save(cart);
    return { cartId: cart.id.get(), status: cart.status };
  }
}
