import { randomUUID } from 'crypto';
import {
  InvalidDocumentError,
  InvalidDocumentTypeError,
  InvalidEmailError,
  InvalidPhoneError,
} from '../errors/user.errors';

export type DocumentTypeValue = 'CPF' | 'CNPJ';
export type UserStatusValue = 'PENDING_ORG_LINK' | 'ORG_LINKED' | 'ACTIVE' | 'INACTIVE';

export class UserId {
  private constructor(public readonly value: string) {}

  static create(value?: string): UserId {
    return new UserId(value ?? randomUUID());
  }

  static isValid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value
    );
  }
}

export class DocumentType {
  private static readonly ALLOWED: DocumentTypeValue[] = ['CPF', 'CNPJ'];

  private constructor(public readonly value: DocumentTypeValue) {}

  static create(value: string): DocumentType {
    if (!this.ALLOWED.includes(value as DocumentTypeValue)) {
      throw new InvalidDocumentTypeError(value);
    }

    return new DocumentType(value as DocumentTypeValue);
  }
}

export class DocumentNumber {
  private constructor(public readonly value: string) {}

  static create(value: string, type: DocumentTypeValue): DocumentNumber {
    const normalized = value.trim();
    if (!/^\d+$/.test(normalized)) {
      throw new InvalidDocumentError(value);
    }

    const expectedLength = type === 'CPF' ? 11 : 14;
    if (normalized.length !== expectedLength) {
      throw new InvalidDocumentError(value);
    }

    return new DocumentNumber(normalized);
  }
}

export class EmailAddress {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  private constructor(public readonly value: string) {}

  static create(value: string): EmailAddress {
    const normalized = value.trim().toLowerCase();
    if (!this.EMAIL_REGEX.test(normalized)) {
      throw new InvalidEmailError(value);
    }

    return new EmailAddress(normalized);
  }
}

export class PhoneNumber {
  private constructor(public readonly value: string) {}

  static create(value: string): PhoneNumber {
    const normalized = value.trim();
    if (!/^\d+$/.test(normalized) || normalized.length > 15) {
      throw new InvalidPhoneError(value);
    }

    return new PhoneNumber(normalized);
  }
}

export class UserStatus {
  private constructor(public readonly value: UserStatusValue) {}

  static create(value: UserStatusValue): UserStatus {
    return new UserStatus(value);
  }
}

export interface CreateUserProps {
  id?: string;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phoneNumber: string;
  emailOptIn: boolean;
  phoneOptIn: boolean;
  status: UserStatusValue;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class User {
  private constructor(
    private readonly id: UserId,
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly documentType: DocumentType,
    private readonly documentNumber: DocumentNumber,
    private readonly email: EmailAddress,
    private readonly phoneNumber: PhoneNumber,
    private readonly emailOptIn: boolean,
    private readonly phoneOptIn: boolean,
    private readonly status: UserStatus,
    private readonly createdAt: Date,
    private readonly updatedAt: Date | null
  ) {}

  static create(props: CreateUserProps): User {
    const documentType = DocumentType.create(props.documentType);
    const documentNumber = DocumentNumber.create(props.documentNumber, documentType.value);
    const email = EmailAddress.create(props.email);
    const phoneNumber = PhoneNumber.create(props.phoneNumber);

    return new User(
      UserId.create(props.id),
      props.firstName.trim(),
      props.lastName.trim(),
      documentType,
      documentNumber,
      email,
      phoneNumber,
      props.emailOptIn,
      props.phoneOptIn,
      UserStatus.create(props.status),
      props.createdAt ?? new Date(),
      props.updatedAt ?? null
    );
  }

  getId(): UserId {
    return this.id;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getDocumentType(): DocumentTypeValue {
    return this.documentType.value;
  }

  getDocumentNumber(): string {
    return this.documentNumber.value;
  }

  getEmail(): string {
    return this.email.value;
  }

  getPhoneNumber(): string {
    return this.phoneNumber.value;
  }

  getEmailOptIn(): boolean {
    return this.emailOptIn;
  }

  getPhoneOptIn(): boolean {
    return this.phoneOptIn;
  }

  getStatus(): UserStatusValue {
    return this.status.value;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }

  activate(): User {
    return new User(
      this.id,
      this.firstName,
      this.lastName,
      this.documentType,
      this.documentNumber,
      this.email,
      this.phoneNumber,
      this.emailOptIn,
      this.phoneOptIn,
      UserStatus.create('ACTIVE'),
      this.createdAt,
      new Date()
    );
  }
}
