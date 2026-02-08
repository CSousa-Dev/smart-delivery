import { DomainError } from '../../../../shared/errors/domain.error';

export class AddressIdRequiredForValidationError extends DomainError {
  constructor() {
    super('Address id is required before setting address validation.', 'ADDRESS_ID_REQUIRED_FOR_VALIDATION');
  }
}
