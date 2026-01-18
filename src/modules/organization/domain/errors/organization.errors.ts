import { DomainError } from './domain.error';

export class OrganizationNotFoundError extends DomainError {
  constructor(organizationId: string) {
    super('Organization not found', 'ORGANIZATION_NOT_FOUND', { organizationId });
  }
}

export class InvalidOrganizationIdError extends DomainError {
  constructor(organizationId: string) {
    super('Invalid organization id', 'INVALID_ORGANIZATION_ID', { organizationId });
  }
}

export class OwnerUserNotFoundError extends DomainError {
  constructor(ownerUserId: string) {
    super('Owner user not found', 'OWNER_USER_NOT_FOUND', { ownerUserId });
  }
}

export class UserAlreadyLinkedError extends DomainError {
  constructor(userId: string) {
    super('User already linked to organization', 'USER_ALREADY_LINKED', { userId });
  }
}

export class MissingLegalNameError extends DomainError {
  constructor() {
    super('Legal name required for CNPJ', 'LEGAL_NAME_REQUIRED');
  }
}

export class VerticalNotRegisteredError extends DomainError {
  constructor(verticalIds: string[]) {
    super('Vertical not registered', 'VERTICAL_NOT_REGISTERED', { verticalIds });
  }
}

export class OrganizationVerticalNotFoundError extends DomainError {
  constructor(organizationId: string, verticalId: string) {
    super('Organization vertical not found', 'ORGANIZATION_VERTICAL_NOT_FOUND', {
      organizationId,
      verticalId,
    });
  }
}

export class OrganizationRequiresActiveVerticalError extends DomainError {
  constructor(organizationId: string) {
    super('Organization requires active vertical', 'ORGANIZATION_REQUIRES_ACTIVE_VERTICAL', {
      organizationId,
    });
  }
}
