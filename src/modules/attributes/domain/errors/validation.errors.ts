import { DomainError } from './domain.error';

export class InvalidValidationPayloadError extends DomainError {
  constructor() {
    super('Invalid validation payload', 'INVALID_VALIDATION_PAYLOAD');
  }
}

export class VerticalRequiredForCategoriesError extends DomainError {
  constructor() {
    super('Vertical required for category chain', 'VERTICAL_REQUIRED');
  }
}
