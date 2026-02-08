import { CartAddressValidation } from '../value-objects/cart-address-validation.vo';

export interface AddressValidationService {
  validateAddress(addressId: string, businessUnitId: string, verticalId: string): Promise<CartAddressValidation>;
}
