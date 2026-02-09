import { CartAddressValidation } from '../value-objects/cart-address-validation.vo';

export interface AddressValidationService {
  validateAddress(
    addressId: string,
    customerId: string,
    businessUnitId: string,
    verticalId: string
  ): Promise<CartAddressValidation>;
}
