import { DomainError } from '../../../../shared/errors/domain.error';

export class AddressValidationRequiredForOrderError extends DomainError {
  constructor(addressId: string | null) {
    super('Address validation is required before ordering.', 'ADDRESS_VALIDATION_REQUIRED_FOR_ORDER', {
      addressId,
    });
  }
}
