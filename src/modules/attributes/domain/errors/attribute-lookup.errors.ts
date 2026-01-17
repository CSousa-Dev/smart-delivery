import { DomainError } from './domain.error';

export class AttributeNotFoundError extends DomainError {
  constructor(attributeId: string) {
    super('Attribute not found', 'ATTRIBUTE_NOT_FOUND', { attributeId });
  }
}

export class AttributeNotOptionTypeError extends DomainError {
  constructor(attributeId: string) {
    super('Attribute is not option type', 'ATTRIBUTE_NOT_OPTION', { attributeId });
  }
}
