import { CartRepository } from '../../domain/repository/cart.repository';
import { PaymentService } from '../../domain/ports/payment.service';
import { CartPaymentMethod } from '../../domain/entities/cart-payment-method.enum';
import { SetCartPaymentPreferenceInputDTO } from '../dtos/set-cart-payment-preference.input.dto';
import { InvalidPaymentPreferenceError } from '../../domain/errors/invalid-payment-preference.error';
import { loadCartForActor } from './helpers/cart-guard';
import { Cart } from '../../domain/entities/cart.entity';

export class SetCartPaymentPreferenceService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly paymentService: PaymentService
  ) {}

  public async execute(input: SetCartPaymentPreferenceInputDTO): Promise<void> {
    const cart = await loadCartForActor(this.cartRepository, input.cartId, input.actorUserId);
    const method = await this.validatePaymentPreference(cart, input.paymentPreferenceId);
    await this.applyPaymentPreference(cart, input.paymentPreferenceId, method);
  }

  private async validatePaymentPreference(
    cart: Cart,
    paymentPreferenceId: string
  ): Promise<CartPaymentMethod> {
    const validation = await this.paymentService.validatePaymentPreference(
      cart.customerId,
      paymentPreferenceId
    );
    if (!validation.isValid || !validation.method) {
      throw new InvalidPaymentPreferenceError(paymentPreferenceId, validation.reason);
    }
    return validation.method;
  }

  private async applyPaymentPreference(
    cart: Cart,
    paymentPreferenceId: string,
    method: CartPaymentMethod
  ): Promise<void> {
    cart.setPaymentPreference(paymentPreferenceId, method);
    await this.cartRepository.save(cart);
  }
}
