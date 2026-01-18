import { DomainError } from './domain.error';

export class InvalidUnitCodeError extends DomainError {
  constructor(code: string) {
    super('Invalid unit code format', 'INVALID_UNIT_CODE', { code });
  }
}

export class InvalidUnitNameError extends DomainError {
  constructor(name: string) {
    super('Invalid unit name', 'INVALID_UNIT_NAME', { name });
  }
}

export class InvalidUnitSymbolError extends DomainError {
  constructor(symbol: string) {
    super('Invalid unit symbol', 'INVALID_UNIT_SYMBOL', { symbol });
  }
}

export class UnitOfMeasureNotFoundError extends DomainError {
  constructor(unitOfMeasureId: string) {
    super('Unit of measure not found', 'UNIT_OF_MEASURE_NOT_FOUND', { unitOfMeasureId });
  }
}

export class UnitCodeAlreadyExistsError extends DomainError {
  constructor(code: string) {
    super('Unit code already exists', 'UNIT_CODE_ALREADY_EXISTS', { code });
  }
}

export class UnitNameAlreadyExistsError extends DomainError {
  constructor(name: string) {
    super('Unit name already exists', 'UNIT_NAME_ALREADY_EXISTS', { name });
  }
}

export class InvalidUnitStatusError extends DomainError {
  constructor(status: string) {
    super('Invalid unit status', 'INVALID_UNIT_STATUS', { status });
  }
}

export class NoUpdatableFieldsError extends DomainError {
  constructor() {
    super('No updatable fields provided', 'NO_UPDATABLE_FIELDS');
  }
}

export class ImmutableFieldUpdateError extends DomainError {
  constructor(field: string) {
    super('Immutable field update is not allowed', 'IMMUTABLE_FIELD_UPDATE', { field });
  }
}

export class OrganizationNotFoundError extends DomainError {
  constructor(organizationId: string) {
    super('Organization not found', 'ORGANIZATION_NOT_FOUND', { organizationId });
  }
}
