import { CartRepository } from '../../domain/repository/cart.repository';
import { PaymentService } from '../../domain/ports/payment.service';
import { SetCartPaymentPreferenceInputDTO } from '../dtos/set-cart-payment-preference.input.dto';
import { SetCartPaymentPreferenceOutputDTO } from '../dtos/set-cart-payment-preference.output.dto';
import { CartNotFoundError } from '../errors/cart-not-found.error';
import { InvalidPaymentPreferenceError } from '../../domain/errors/invalid-payment-preference.error';
import { CartOwnerMismatchError } from '../errors/cart-owner-mismatch.error';

export class SetCartPaymentPreferenceService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly paymentService: PaymentService
  ) {}

  public async execute(
    input: SetCartPaymentPreferenceInputDTO
  ): Promise<SetCartPaymentPreferenceOutputDTO> {
    const cart = await this.cartRepository.findById(input.cartId);
    if (!cart) {
      throw new CartNotFoundError(input.cartId);
    }
    if (cart.customerId !== input.actorUserId) {
      throw new CartOwnerMismatchError(input.actorUserId, cart.id.get());
    }

    const validation = await this.paymentService.validatePaymentPreference(
      cart.customerId,
      input.paymentPreferenceId
    );
    if (!validation.isValid || !validation.method) {
      throw new InvalidPaymentPreferenceError(input.paymentPreferenceId, validation.reason);
    }

    cart.setPaymentPreference(input.paymentPreferenceId, validation.method);
    await this.cartRepository.save(cart);

    return {
      cartId: cart.id.get(),
      paymentPreferenceId: input.paymentPreferenceId,
      paymentMethod: validation.method,
    };
  }
}
