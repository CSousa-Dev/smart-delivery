import { CartRepository } from '../../domain/repository/cart.repository';
import { FailCartPaymentInputDTO } from '../dtos/fail-cart-payment.input.dto';
import { CartEventPublisher } from '../ports/cart-event.publisher';
import { Cart } from '../../domain/entities/cart.entity';

export class FailCartPaymentService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly eventPublisher: CartEventPublisher
  ) {}

  public async execute(input: FailCartPaymentInputDTO): Promise<void> {
    const cart = await this.cartRepository.findByQuoteId(input.quoteId);
    if (!cart) {
      return;
    }

    const reason = input.reason ?? 'Payment failed or expired.';
    cart.failPayment(reason, input.paymentId);
    await this.cartRepository.save(cart);
    await this.publishCartEvents(cart);
  }

  private async publishCartEvents(cart: Cart): Promise<void> {
    const events = cart.pullDomainEvents();
    if (events.length > 0) {
      await this.eventPublisher.publish(events);
    }
  }
}
