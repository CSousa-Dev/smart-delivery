import { CartRepository } from '../../domain/repository/cart.repository';
import { AddressValidationService } from '../../domain/ports/address-validation.service';
import { FulfillmentService } from '../../domain/ports/fulfillment.service';
import { SetCartAddressInputDTO } from '../dtos/set-cart-address.input.dto';
import { SetCartAddressOutputDTO } from '../dtos/set-cart-address.output.dto';
import { CartNotFoundError } from '../errors/cart-not-found.error';
import { AddressIdRequiredForValidationError } from '../../domain/errors/address-id-required-for-validation.error';
import { AddressOutOfRangeForOrderError } from '../../domain/errors/address-out-of-range-for-order.error';
import { CartOwnerMismatchError } from '../errors/cart-owner-mismatch.error';

export class SetCartAddressService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly addressValidationService: AddressValidationService,
    private readonly fulfillmentService: FulfillmentService
  ) {}

  public async execute(input: SetCartAddressInputDTO): Promise<SetCartAddressOutputDTO> {
    if (!input.addressId) {
      throw new AddressIdRequiredForValidationError();
    }

    const cart = await this.cartRepository.findById(input.cartId);
    if (!cart) {
      throw new CartNotFoundError(input.cartId);
    }
    if (cart.customerId !== input.actorUserId) {
      throw new CartOwnerMismatchError(input.actorUserId, cart.id.get());
    }

    const validation = await this.addressValidationService.validateAddress(
      input.addressId,
      cart.businessUnitId,
      cart.verticalId
    );
    if (!validation.isValid) {
      throw new AddressOutOfRangeForOrderError(validation.addressId, validation.reason);
    }

    const deliveryPlan = await this.fulfillmentService.createDeliveryPlan({
      cartId: cart.id.get(),
      customerId: cart.customerId,
      businessUnitId: cart.businessUnitId,
      verticalId: cart.verticalId,
      addressId: input.addressId,
    });

    cart.setDeliveryPlan(deliveryPlan);
    await this.cartRepository.save(cart);

    return {
      cartId: cart.id.get(),
      addressId: input.addressId,
      fulfillmentPlanId: deliveryPlan.planId,
    };
  }
}
