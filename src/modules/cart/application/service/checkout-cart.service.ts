import { CartRepository } from '../../domain/repository/cart.repository';
import { PaymentService } from '../../domain/ports/payment.service';
import { FulfillmentService } from '../../domain/ports/fulfillment.service';
import { OrderService } from '../../domain/ports/order.service';
import { CheckoutCartInputDTO } from '../dtos/checkout-cart.input.dto';
import { CheckoutCartOutputDTO } from '../dtos/checkout-cart.output.dto';
import { OrderPaymentReference } from '../../domain/value-objects/order-payment-reference.vo';
import { CartPaymentMethod } from '../../domain/entities/cart-payment-method.enum';
import { Cart } from '../../domain/entities/cart.entity';
import { DeliveryPlan } from '../../domain/entities/delivery-plan.entity';
import { PaymentQuote } from '../../domain/value-objects/payment-quote.vo';
import { PaymentQuoteMapper } from '../mappers/payment-quote.mapper';
import { clearQuoteIfExists, loadCartForActor } from './helpers/cart-guard';
import { AddressValidationRequiredForOrderError } from '../../domain/errors/address-validation-required-for-order.error';

export class CheckoutCartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly fulfillmentService: FulfillmentService,
    private readonly paymentService: PaymentService,
    private readonly orderService: OrderService
  ) {}

  public async execute(input: CheckoutCartInputDTO): Promise<CheckoutCartOutputDTO> {
    const cart = await this.loadCartForCheckout(input);
    const deliveryPlan = await this.createDeliveryPlanAndClearQuote(cart);
    const quote = await this.createQuoteForCart(cart, deliveryPlan);

    if (quote.paymentMethod === CartPaymentMethod.OFFLINE) {
      return this.handleOfflinePayment(cart, quote);
    }

    return this.handleOnlinePayment(cart, quote);
  }

  private async loadCartForCheckout(input: CheckoutCartInputDTO): Promise<Cart> {
    const cart = await loadCartForActor(this.cartRepository, input.cartId, input.actorUserId);

    if (!cart.addressId) {
      throw new AddressValidationRequiredForOrderError(cart.addressId);
    }

    return cart;
  }

  private async createDeliveryPlanAndClearQuote(cart: Cart): Promise<DeliveryPlan> {
    const [deliveryPlan] = await Promise.all([
      this.fulfillmentService.createDeliveryPlan({
        cartId: cart.id.get(),
        customerId: cart.customerId,
        businessUnitId: cart.businessUnitId,
        verticalId: cart.verticalId,
        addressId: cart.addressId!,
      }),
      clearQuoteIfExists(cart, this.paymentService),
    ]);

    return deliveryPlan;
  }

  private async createQuoteForCart(cart: Cart, deliveryPlan: DeliveryPlan): Promise<PaymentQuote> {
    cart.setDeliveryPlan(deliveryPlan);
    cart.startCheckout();
    const quote = await this.paymentService.createQuote(PaymentQuoteMapper.toPayload(cart));
    cart.setQuoteId(quote.quoteId);
    return quote;
  }

  private async handleOfflinePayment(
    cart: Cart,
    quote: PaymentQuote
  ): Promise<CheckoutCartOutputDTO> {
    const payment = new OrderPaymentReference(quote.quoteId, null);
    const orderId = await this.orderService.createOrderFromCart(cart, payment);
    cart.markOrdered();
    await this.cartRepository.save(cart);
    return { quoteId: quote.quoteId, status: cart.status, orderId: orderId };
  }

  private async handleOnlinePayment(
    cart: Cart,
    quote: PaymentQuote
  ): Promise<CheckoutCartOutputDTO> {
    cart.startPayment();
    await this.cartRepository.save(cart);
    return {
      quoteId: quote.quoteId,
      status: cart.status,
      orderId: null,
    };
  }
}
