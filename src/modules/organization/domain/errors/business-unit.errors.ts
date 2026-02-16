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
  constructor(organizationId: string, verticalCode: string) {
    super('Vertical not in organization', 'VERTICAL_NOT_IN_ORGANIZATION', {
      organizationId,
      verticalCode,
    });
  }
}

export class BusinessUnitVerticalNotFoundError extends DomainError {
  constructor(businessUnitId: string, verticalCode: string) {
    super('Business unit vertical not found', 'BUSINESS_UNIT_VERTICAL_NOT_FOUND', {
      businessUnitId,
      verticalCode,
    });
  }
}

/** BU creation is platform-only; owner cannot create BU. */
export class OwnerCannotCreateBusinessUnitError extends DomainError {
  constructor(ownerUserId: string, organizationId: string) {
    super('Owner cannot create business unit; only platform can', 'OWNER_CANNOT_CREATE_BUSINESS_UNIT', {
      ownerUserId,
      organizationId,
    });
  }
}

/** Organization has reached its business unit limit. */
export class BusinessUnitLimitReachedError extends DomainError {
  constructor(organizationId: string, limit: number) {
    super('Business unit limit reached for organization', 'BUSINESS_UNIT_LIMIT_REACHED', {
      organizationId,
      limit,
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
