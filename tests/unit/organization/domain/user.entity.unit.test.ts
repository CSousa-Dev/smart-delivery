import { User } from '../../../../src/modules/organization/domain/entities/user.entity';
import {
  InvalidDocumentError,
  InvalidDocumentTypeError,
  InvalidEmailError,
  InvalidPhoneError,
} from '../../../../src/modules/organization/domain/errors/user.errors';

describe('User Entity', () => {
  it('should create a user with CPF document', () => {
    const user = User.create({
      firstName: 'Ana',
      lastName: 'Silva',
      documentType: 'CPF',
      documentNumber: '12345678901',
      email: 'ana.silva@example.com',
      phoneNumber: '11999999999',
      emailOptIn: true,
      phoneOptIn: false,
      status: 'PENDING_ORG_LINK',
    });

    expect(user.getDocumentType()).toBe('CPF');
    expect(user.getDocumentNumber()).toBe('12345678901');
    expect(user.getEmail()).toBe('ana.silva@example.com');
  });

  it('should create a user with CNPJ document', () => {
    const user = User.create({
      firstName: 'Empresa',
      lastName: 'LTDA',
      documentType: 'CNPJ',
      documentNumber: '12345678901234',
      email: 'contato@empresa.com',
      phoneNumber: '11988887777',
      emailOptIn: true,
      phoneOptIn: true,
      status: 'ORG_LINKED',
    });

    expect(user.getDocumentType()).toBe('CNPJ');
    expect(user.getDocumentNumber()).toBe('12345678901234');
  });

  it('should normalize email to lower case', () => {
    const user = User.create({
      firstName: 'Joao',
      lastName: 'Souza',
      documentType: 'CPF',
      documentNumber: '12345678901',
      email: 'JOAO@EXAMPLE.COM',
      phoneNumber: '11977776666',
      emailOptIn: true,
      phoneOptIn: false,
      status: 'PENDING_ORG_LINK',
    });

    expect(user.getEmail()).toBe('joao@example.com');
  });

  it('should reject invalid document type', () => {
    expect(() =>
      User.create({
        firstName: 'Ana',
        lastName: 'Silva',
        documentType: 'RG',
        documentNumber: '12345678901',
        email: 'ana@example.com',
        phoneNumber: '11999999999',
        emailOptIn: true,
        phoneOptIn: true,
        status: 'PENDING_ORG_LINK',
      })
    ).toThrow(InvalidDocumentTypeError);
  });

  it('should reject invalid document length', () => {
    expect(() =>
      User.create({
        firstName: 'Ana',
        lastName: 'Silva',
        documentType: 'CPF',
        documentNumber: '123',
        email: 'ana@example.com',
        phoneNumber: '11999999999',
        emailOptIn: true,
        phoneOptIn: true,
        status: 'PENDING_ORG_LINK',
      })
    ).toThrow(InvalidDocumentError);
  });

  it('should reject invalid email format', () => {
    expect(() =>
      User.create({
        firstName: 'Ana',
        lastName: 'Silva',
        documentType: 'CPF',
        documentNumber: '12345678901',
        email: 'invalid-email',
        phoneNumber: '11999999999',
        emailOptIn: true,
        phoneOptIn: true,
        status: 'PENDING_ORG_LINK',
      })
    ).toThrow(InvalidEmailError);
  });

  it('should reject invalid phone format', () => {
    expect(() =>
      User.create({
        firstName: 'Ana',
        lastName: 'Silva',
        documentType: 'CPF',
        documentNumber: '12345678901',
        email: 'ana@example.com',
        phoneNumber: '11-9999-9999',
        emailOptIn: true,
        phoneOptIn: true,
        status: 'PENDING_ORG_LINK',
      })
    ).toThrow(InvalidPhoneError);
  });

  it('should activate user status', () => {
    const user = User.create({
      firstName: 'Ana',
      lastName: 'Silva',
      documentType: 'CPF',
      documentNumber: '12345678901',
      email: 'ana@example.com',
      phoneNumber: '11999999999',
      emailOptIn: true,
      phoneOptIn: true,
      status: 'ORG_LINKED',
    });

    const activated = user.activate();

    expect(activated.getStatus()).toBe('ACTIVE');
    expect(activated.getUpdatedAt()).not.toBeNull();
  });
});
