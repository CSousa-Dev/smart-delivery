import { CartRepository } from '../../domain/repository/cart.repository';
import { PaymentService } from '../../domain/ports/payment.service';
import { OrderService } from '../../domain/ports/order.service';
import { CheckoutCartInputDTO } from '../dtos/checkout-cart.input.dto';
import { CheckoutCartOutputDTO } from '../dtos/checkout-cart.output.dto';
import { CartNotFoundError } from '../errors/cart-not-found.error';
import { OrderPaymentReference } from '../../domain/value-objects/order-payment-reference.vo';
import { CartPaymentMethod } from '../../domain/entities/cart-payment-method.enum';
import { CartOwnerMismatchError } from '../errors/cart-owner-mismatch.error';

export class CheckoutCartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly paymentService: PaymentService,
    private readonly orderService: OrderService
  ) {}

  public async execute(input: CheckoutCartInputDTO): Promise<CheckoutCartOutputDTO> {
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

    cart.startCheckout();
    const deliveryPlan = cart.deliveryPlan!;

    const quote = await this.paymentService.createQuote({
      cartId: cart.id.get(),
      customerId: cart.customerId,
      businessUnitId: cart.businessUnitId,
      verticalId: cart.verticalId,
      paymentPreferenceId: cart.paymentPreferenceId,
      fulfillmentPlanId: deliveryPlan.planId,
      addressId: deliveryPlan.addressId,
      coupons: cart.coupons.map((coupon) => coupon.code),
    });

    cart.setQuoteId(quote.quoteId);

    if (quote.paymentMethod === CartPaymentMethod.OFFLINE) {
      const payment = new OrderPaymentReference(quote.quoteId, null);
      const orderId = await this.orderService.createOrderFromCart(cart, payment);
      cart.markOrdered();
      await this.cartRepository.save(cart);
      return {
        cartId: cart.id.get(),
        status: cart.status,
        quoteId: quote.quoteId,
        paymentMethod: quote.paymentMethod,
        orderId,
      };
    }

    cart.startPayment();
    await this.cartRepository.save(cart);
    return {
      cartId: cart.id.get(),
      status: cart.status,
      quoteId: quote.quoteId,
      paymentMethod: quote.paymentMethod,
    };
  }
}
