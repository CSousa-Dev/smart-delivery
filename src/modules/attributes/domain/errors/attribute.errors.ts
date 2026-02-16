import { DomainError } from './domain.error';

export class AttributeCodeAlreadyExistsError extends DomainError {
  constructor(code: string) {
    super('Attribute code already exists', 'ATTRIBUTE_CODE_ALREADY_EXISTS', { code });
  }
}

export class AttributeNameAlreadyExistsError extends DomainError {
  constructor(name: string) {
    super('Attribute name already exists', 'ATTRIBUTE_NAME_ALREADY_EXISTS', { name });
  }
}

export class InvalidAttributeCodeError extends DomainError {
  constructor(code: string) {
    super('Invalid attribute code format', 'INVALID_ATTRIBUTE_CODE', { code });
  }
}

export class InvalidAttributeTypeError extends DomainError {
  constructor(type: string) {
    super('Invalid attribute type', 'INVALID_ATTRIBUTE_TYPE', { type });
  }
}

export class InvalidAttributeLimitsError extends DomainError {
  constructor(minValue: number, maxValue: number) {
    super('Invalid attribute limits', 'INVALID_ATTRIBUTE_LIMITS', { minValue, maxValue });
  }
}

export class InvalidDefaultValueError extends DomainError {
  constructor() {
    super('Invalid default value', 'INVALID_DEFAULT_VALUE');
  }
}

export class DefaultValueNotFoundError extends DomainError {
  constructor(defaultValueId: string) {
    super('Default value not found', 'DEFAULT_VALUE_NOT_FOUND', { defaultValueId });
  }
}

export class AttributeInUseError extends DomainError {
  constructor(attributeId: string) {
    super('Attribute is in use', 'ATTRIBUTE_IN_USE', { attributeId });
  }
}
