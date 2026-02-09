import { DomainError } from '../../../../shared/errors/domain.error';

export class AddressIdRequiredForValidationError extends DomainError {
  constructor() {
    super('ADDRESS_ID_REQUIRED_FOR_VALIDATION');
  }
}
