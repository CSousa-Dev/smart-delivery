import { DomainError } from './domain.error';

export class UserNotOwnerError extends DomainError {
  constructor(userId: string, organizationId: string) {
    super('User is not owner', 'USER_NOT_OWNER', { userId, organizationId });
  }
}

export class InvalidPhoneNumberError extends DomainError {
  constructor(phoneNumber: string) {
    super('Invalid phone number', 'INVALID_PHONE_NUMBER', { phoneNumber });
  }
}

export class InvalidPostalCodeError extends DomainError {
  constructor(postalCode: string) {
    super('Invalid postal code', 'INVALID_POSTAL_CODE', { postalCode });
  }
}

export class InvalidStateError extends DomainError {
  constructor(state: string) {
    super('Invalid state', 'INVALID_STATE', { state });
  }
}

export class InvalidCountryError extends DomainError {
  constructor(country: string) {
    super('Invalid country', 'INVALID_COUNTRY', { country });
  }
}

export class InvalidBusinessUnitIdError extends DomainError {
  constructor(businessUnitId: string) {
    super('Invalid business unit id', 'INVALID_BUSINESS_UNIT_ID', { businessUnitId });
  }
}

export class BusinessUnitNotFoundError extends DomainError {
  constructor(businessUnitId: string) {
    super('Business unit not found', 'BUSINESS_UNIT_NOT_FOUND', { businessUnitId });
  }
}

export class VerticalRequiredError extends DomainError {
  constructor() {
    super('At least one vertical is required', 'VERTICAL_REQUIRED');
  }
}

export class VerticalNotInOrganizationError extends DomainError {
  constructor(organizationId: string, verticalId: string) {
    super('Vertical not in organization', 'VERTICAL_NOT_IN_ORGANIZATION', {
      organizationId,
      verticalId,
    });
  }
}

export class BusinessUnitVerticalNotFoundError extends DomainError {
  constructor(businessUnitId: string, verticalId: string) {
    super('Business unit vertical not found', 'BUSINESS_UNIT_VERTICAL_NOT_FOUND', {
      businessUnitId,
      verticalId,
    });
  }
}

export class BusinessUnitRequiresActiveVerticalError extends DomainError {
  constructor(businessUnitId: string) {
    super('Business unit requires active vertical', 'BUSINESS_UNIT_REQUIRES_ACTIVE_VERTICAL', {
      businessUnitId,
    });
  }
}
