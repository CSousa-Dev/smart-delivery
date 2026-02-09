import { CartRepository } from '../../domain/repository/cart.repository';
import { Cart } from '../../domain/entities/cart.entity';
import { PaymentService } from '../../domain/ports/payment.service';
import { OrderService } from '../../domain/ports/order.service';
import { OrderPaymentReference } from '../../domain/value-objects/order-payment-reference.vo';
import { CartEventPublisher } from '../ports/cart-event.publisher';
import { ProcessCartPaymentInputDTO } from '../dtos/process-cart-payment.input.dto';
import { CartNotFoundError } from '../errors/cart-not-found.error';
import { CartOwnerMismatchError } from '../errors/cart-owner-mismatch.error';

export class ProcessCartPaymentService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly paymentService: PaymentService,
    private readonly eventPublisher: CartEventPublisher,
    private readonly orderService: OrderService
  ) {}

  /**
   * Command-only: no return payload. Persists cart changes and publishes domain events.
   * Other parts of the system react to those events.
   */
  public async execute(input: ProcessCartPaymentInputDTO): Promise<void> {
    const cart = await this.cartRepository.findByQuoteId(input.quoteId);
    if (!cart) {
      throw new CartNotFoundError(input.quoteId);
    }
    if (cart.customerId !== input.actorUserId) {
      throw new CartOwnerMismatchError(input.actorUserId, cart.id.get());
    }

    const receipt = await this.paymentService.getReceipt(cart.id.get(), input.paymentId);

    if (!receipt.approved) {
      cart.failPayment('Payment not approved.', input.paymentId);
      await this.cartRepository.save(cart);
      await this.publishCartEvents(cart);
      return;
    }

    cart.confirmPayment(input.paymentId);
    const payment = new OrderPaymentReference(cart.quoteId!, input.paymentId);
    await this.orderService.createOrderFromCart(cart, payment);
    cart.markOrdered();
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
