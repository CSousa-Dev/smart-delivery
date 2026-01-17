import { DomainError } from './domain.error';

export class DocumentAlreadyExistsError extends DomainError {
  constructor(documentNumber: string) {
    super('Document already exists', 'DOCUMENT_ALREADY_EXISTS', { documentNumber });
  }
}

export class EmailAlreadyExistsError extends DomainError {
  constructor(email: string) {
    super('Email already exists', 'EMAIL_ALREADY_EXISTS', { email });
  }
}

export class PhoneAlreadyExistsError extends DomainError {
  constructor(phoneNumber: string) {
    super('Phone already exists', 'PHONE_ALREADY_EXISTS', { phoneNumber });
  }
}

export class InvalidDocumentTypeError extends DomainError {
  constructor(documentType: string) {
    super('Invalid document type', 'INVALID_DOCUMENT_TYPE', { documentType });
  }
}

export class InvalidDocumentError extends DomainError {
  constructor(documentNumber: string) {
    super('Invalid document', 'INVALID_DOCUMENT', { documentNumber });
  }
}

export class InvalidEmailError extends DomainError {
  constructor(email: string) {
    super('Invalid email', 'INVALID_EMAIL', { email });
  }
}

export class InvalidPhoneError extends DomainError {
  constructor(phoneNumber: string) {
    super('Invalid phone', 'INVALID_PHONE', { phoneNumber });
  }
}

export class InvalidUserIdError extends DomainError {
  constructor(userId: string) {
    super('Invalid user id', 'INVALID_USER_ID', { userId });
  }
}

export class UserNotFoundError extends DomainError {
  constructor(userId: string) {
    super('User not found', 'USER_NOT_FOUND', { userId });
  }
}
