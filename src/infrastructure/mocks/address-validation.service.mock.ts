import { AddressValidationService } from '../../modules/cart/domain/ports/address-validation.service';
import { CartAddressValidation } from '../../modules/cart/domain/value-objects/cart-address-validation.vo';

export class AddressValidationServiceMock implements AddressValidationService {
  async validateAddress(
    addressId: string,
    _businessUnitId: string,
    _verticalId: string
  ): Promise<CartAddressValidation> {
    return new CartAddressValidation(addressId, true);
  }
}
