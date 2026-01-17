import { DomainError } from './domain.error';

export class InvalidCategoryChainError extends DomainError {
  constructor() {
    super('Invalid category chain', 'INVALID_CATEGORY_CHAIN');
  }
}

export class NoAttributesForContextError extends DomainError {
  constructor() {
    super('No attributes for context', 'NO_ATTRIBUTES_FOR_CONTEXT');
  }
}

export class AttributeNotInVerticalError extends DomainError {
  constructor(attributeId: string, verticalId: string) {
    super('Attribute not in vertical', 'ATTRIBUTE_NOT_IN_VERTICAL', {
      attributeId,
      verticalId,
    });
  }
}
