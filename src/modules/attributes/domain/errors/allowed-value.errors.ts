import { DomainError } from './domain.error';

export class AllowedValueNameAlreadyExistsError extends DomainError {
  constructor(name: string) {
    super('Allowed value name already exists', 'ALLOWED_VALUE_NAME_EXISTS', { name });
  }
}

export class AllowedValueValueAlreadyExistsError extends DomainError {
  constructor(value: string) {
    super('Allowed value value already exists', 'ALLOWED_VALUE_VALUE_EXISTS', { value });
  }
}

export class InvalidAllowedValueValueError extends DomainError {
  constructor(value: string) {
    super('Invalid allowed value format', 'INVALID_ALLOWED_VALUE_VALUE', { value });
  }
}

export class InvalidAllowedValueNameError extends DomainError {
  constructor() {
    super('Invalid allowed value name', 'INVALID_ALLOWED_VALUE_NAME');
  }
}

export class AllowedValueLengthOutOfBoundsError extends DomainError {
  constructor(minValue: number, maxValue: number, length: number) {
    super('Allowed value length out of bounds', 'ALLOWED_VALUE_OUT_OF_BOUNDS', {
      minValue,
      maxValue,
      length,
    });
  }
}
