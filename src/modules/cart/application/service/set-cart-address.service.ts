import { CartRepository } from '../../domain/repository/cart.repository';
import { AddressValidationService } from '../../domain/ports/address-validation.service';
import { SetCartAddressInputDTO } from '../dtos/set-cart-address.input.dto';
import { AddressIdRequiredForValidationError } from '../../domain/errors/address-id-required-for-validation.error';
import { AddressOutOfRangeForOrderError } from '../../domain/errors/address-out-of-range-for-order.error';
import { loadCartForActor } from './helpers/cart-guard';
import { Cart } from '../../domain/entities/cart.entity';

export class SetCartAddressService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly addressValidationService: AddressValidationService
  ) {}

  public async execute(input: SetCartAddressInputDTO): Promise<void> {
    const cart = await loadCartForActor(this.cartRepository, input.cartId, input.actorUserId);
    this.ensureAddressId(input.addressId);
    await this.validateAddressForCart(cart, input.addressId);
    await this.applyAddress(cart, input.addressId);
  }

  private ensureAddressId(addressId?: string | null): void {
    if (!addressId) {
      throw new AddressIdRequiredForValidationError();
    }
  }

  private async validateAddressForCart(cart: Cart, addressId: string): Promise<void> {
    const validation = await this.addressValidationService.validateAddress(
      addressId,
      cart.customerId,
      cart.businessUnitId,
      cart.verticalId
    );
    if (!validation.isValid) {
      throw new AddressOutOfRangeForOrderError(validation.addressId, validation.reason);
    }
  }

  private async applyAddress(cart: Cart, addressId: string): Promise<void> {
    cart.setAddress(addressId);
    await this.cartRepository.save(cart);
  }
}
