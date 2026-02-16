import { DomainError } from './domain.error';

export class VerticalCodeAlreadyExistsError extends DomainError {
  constructor(code: string) {
    super('Vertical code already exists', 'VERTICAL_CODE_ALREADY_EXISTS', { code });
  }
}

export class VerticalNameAlreadyExistsError extends DomainError {
  constructor(name: string) {
    super('Vertical name already exists', 'VERTICAL_NAME_ALREADY_EXISTS', { name });
  }
}

export class InvalidVerticalCodeError extends DomainError {
  constructor(code: string) {
    super('Invalid vertical code format', 'INVALID_VERTICAL_CODE', { code });
  }
}

export class InvalidVerticalNameError extends DomainError {
  constructor(name: string) {
    super('Invalid vertical name', 'INVALID_VERTICAL_NAME', { name });
  }
}

export class InvalidVerticalDescriptionError extends DomainError {
  constructor(description: string) {
    super('Invalid vertical description', 'INVALID_VERTICAL_DESCRIPTION', { description });
  }
}

export class VerticalNotFoundError extends DomainError {
  constructor(verticalId: string) {
    super('Vertical not found', 'VERTICAL_NOT_FOUND', { verticalId });
  }
}

export class VerticalAlreadyInactiveError extends DomainError {
  constructor(verticalId: string) {
    super('Vertical already inactive', 'VERTICAL_ALREADY_INACTIVE', { verticalId });
  }
}

export class VerticalAlreadyActiveError extends DomainError {
  constructor(verticalId: string) {
    super('Vertical already active', 'VERTICAL_ALREADY_ACTIVE', { verticalId });
  }
}
