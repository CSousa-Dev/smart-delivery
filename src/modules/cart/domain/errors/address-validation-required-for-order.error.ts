import { DomainError } from '../../../../shared/errors/domain.error';

export class AddressValidationRequiredForOrderError extends DomainError {
  constructor(addressId: string | null) {
    super('ADDRESS_VALIDATION_REQUIRED_FOR_ORDER', {
      addressId,
    });
  }
}
