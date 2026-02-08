import { CartRepository } from '../../domain/repository/cart.repository';
import { PaymentService } from '../../domain/ports/payment.service';
import { RetryCartPaymentInputDTO } from '../dtos/retry-cart-payment.input.dto';
import { CartStatusOutputDTO } from '../dtos/cart-status.output.dto';
import { CartNotFoundError } from '../errors/cart-not-found.error';
import { CartOwnerMismatchError } from '../errors/cart-owner-mismatch.error';

export class RetryCartPaymentService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly paymentService: PaymentService
  ) {}

  public async execute(input: RetryCartPaymentInputDTO): Promise<CartStatusOutputDTO> {
    const cart = await this.cartRepository.findById(input.cartId);
    if (!cart) {
      throw new CartNotFoundError(input.cartId);
    }
    if (cart.customerId !== input.actorUserId) {
      throw new CartOwnerMismatchError(input.actorUserId, cart.id.get());
    }

    if (cart.quoteId) {
      await this.paymentService.deleteQuote(cart.quoteId);
    }

    cart.retryPayment();
    await this.cartRepository.save(cart);
    return { cartId: cart.id.get(), status: cart.status };
  }
}
