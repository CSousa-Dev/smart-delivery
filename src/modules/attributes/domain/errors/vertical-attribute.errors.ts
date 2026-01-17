import { DomainError } from './domain.error';

export class VerticalAttributeAlreadyExistsError extends DomainError {
  constructor(verticalId: string, attributeId: string) {
    super('Vertical attribute link already exists', 'VERTICAL_ATTRIBUTE_EXISTS', {
      verticalId,
      attributeId,
    });
  }
}

export class AllowedValueNotFoundError extends DomainError {
  constructor(allowedValueId: string) {
    super('Allowed value not found', 'ALLOWED_VALUE_NOT_FOUND', { allowedValueId });
  }
}

export class AllowedValueConflictError extends DomainError {
  constructor(nameOrValue: string) {
    super('Allowed value conflict', 'ALLOWED_VALUE_CONFLICT', { nameOrValue });
  }
}
