import { CartRepository } from '../../domain/repository/cart.repository';
import { PaymentService } from '../../domain/ports/payment.service';
import { ReopenCartInputDTO } from '../dtos/reopen-cart.input.dto';
import { ReopenCartOutputDTO } from '../dtos/reopen-cart.output.dto';
import { clearQuoteIfExists, loadCartForActor } from './helpers/cart-guard';

export class ReopenCartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly paymentService: PaymentService
  ) {}

  public async execute(input: ReopenCartInputDTO): Promise<ReopenCartOutputDTO> {
    const cart = await loadCartForActor(this.cartRepository, input.cartId, input.actorUserId);

    await clearQuoteIfExists(cart, this.paymentService);

    cart.clearDeliveryPlan();
    cart.reopen();
    await this.cartRepository.save(cart);
    return { cartId: cart.id.get(), status: cart.status };
  }
}
