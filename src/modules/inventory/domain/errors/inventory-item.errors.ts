import { DomainError } from './domain.error';

export class BusinessUnitNotFoundError extends DomainError {
  constructor(businessUnitId: string) {
    super('Business unit not found', 'BUSINESS_UNIT_NOT_FOUND', { businessUnitId });
  }
}

export class BusinessUnitOrganizationMismatchError extends DomainError {
  constructor(businessUnitId: string, organizationId: string) {
    super('Business unit does not belong to organization', 'BUSINESS_UNIT_ORG_MISMATCH', {
      businessUnitId,
      organizationId,
    });
  }
}

export class UnitOfMeasureNotFoundError extends DomainError {
  constructor(unitOfMeasureId: string) {
    super('Unit of measure not found', 'UNIT_OF_MEASURE_NOT_FOUND', { unitOfMeasureId });
  }
}

export class UnitOfMeasureOrganizationMismatchError extends DomainError {
  constructor(unitOfMeasureId: string, organizationId: string) {
    super('Unit of measure does not belong to organization', 'UNIT_OF_MEASURE_ORG_MISMATCH', {
      unitOfMeasureId,
      organizationId,
    });
  }
}

export class UnitOfMeasureInactiveError extends DomainError {
  constructor(unitOfMeasureId: string) {
    super('Unit of measure is inactive', 'UNIT_OF_MEASURE_INACTIVE', { unitOfMeasureId });
  }
}

export class InventoryItemNameAlreadyExistsError extends DomainError {
  constructor(name: string) {
    super('Inventory item name already exists', 'INVENTORY_ITEM_NAME_EXISTS', { name });
  }
}

export class InvalidInventoryItemTypeError extends DomainError {
  constructor(type: string) {
    super('Invalid inventory item type', 'INVALID_INVENTORY_ITEM_TYPE', { type });
  }
}

export class InvalidInventoryItemNameError extends DomainError {
  constructor(name: string) {
    super('Invalid inventory item name', 'INVALID_INVENTORY_ITEM_NAME', { name });
  }
}

export class MissingRequiredFieldsError extends DomainError {
  constructor(fields: string[]) {
    super('Missing required fields', 'MISSING_REQUIRED_FIELDS', { fields });
  }
}

export class InvalidRequiresExpirationError extends DomainError {
  constructor(value: unknown) {
    super('Invalid requiresExpiration value', 'INVALID_REQUIRES_EXPIRATION', {
      requiresExpiration: value,
    });
  }
}
