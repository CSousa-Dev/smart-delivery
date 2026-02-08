import { CartRepository } from '../../domain/repository/cart.repository';
import { Cart } from '../../domain/entities/cart.entity';
import { PaymentService } from '../../domain/ports/payment.service';
import { PaymentReceipt } from '../../domain/value-objects/payment-receipt.vo';
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

    if (receipt.cartId !== cart.id.get() || receipt.paymentId !== input.paymentId) {
      cart.failPayment('Payment does not match cart.', input.paymentId);
      await this.cartRepository.save(cart);
      await this.publishCartEvents(cart);
      return;
    }

    if (!receipt.approved) {
      cart.failPayment('Payment not approved.', input.paymentId);
      await this.cartRepository.save(cart);
      await this.publishCartEvents(cart);
      return;
    }

    const confirmedReceipt = this.cloneReceipt(receipt);
    cart.confirmPayment(confirmedReceipt);
    const payment = new OrderPaymentReference(cart.quoteId!, confirmedReceipt.paymentId);
    await this.orderService.createOrderFromCart(cart, payment);
    cart.markOrdered();
    await this.cartRepository.save(cart);
    await this.publishCartEvents(cart);
  }

  private cloneReceipt(receipt: PaymentReceipt): PaymentReceipt {
    return new PaymentReceipt(
      receipt.cartId,
      receipt.paymentId,
      receipt.amount,
      receipt.approved,
      receipt.paidAt
    );
  }

  private async publishCartEvents(cart: Cart): Promise<void> {
    const events = cart.pullDomainEvents();
    if (events.length > 0) {
      await this.eventPublisher.publish(events);
    }
  }
}
