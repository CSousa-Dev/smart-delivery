import { BusinessUnit } from '../../../../src/modules/organization/domain/entities/business-unit.entity';
import {
  InvalidCountryError,
  InvalidPhoneNumberError,
  InvalidPostalCodeError,
  InvalidStateError,
} from '../../../../src/modules/organization/domain/errors/business-unit.errors';
import { InvalidEmailError } from '../../../../src/modules/organization/domain/errors/user.errors';

describe('BusinessUnit Entity', () => {
  const baseAddress = {
    street: 'Rua A',
    number: '123',
    neighborhood: 'Centro',
    city: 'Sao Paulo',
    state: 'SP',
    postalCode: '01001000',
    country: 'BR',
    referencePoint: 'Proximo ao mercado',
  };

  it('should create business unit with valid data', () => {
    const unit = BusinessUnit.create({
      organizationId: 'org-1',
      publicName: 'Loja X',
      phoneNumber: '11999999999',
      phoneHasWhatsapp: true,
      email: 'contato@lojax.com',
      instagram: '@lojax',
      website: 'https://lojax.com',
      address: baseAddress,
      status: 'PENDING_PRODUCTS',
    });

    expect(unit.getStatus()).toBe('PENDING_PRODUCTS');
    expect(unit.getEmail()).toBe('contato@lojax.com');
  });

  it('should reject invalid phone number', () => {
    expect(() =>
      BusinessUnit.create({
        organizationId: 'org-1',
        publicName: 'Loja X',
        phoneNumber: '1234567890123456',
        phoneHasWhatsapp: true,
        address: baseAddress,
        status: 'PENDING_PRODUCTS',
      })
    ).toThrow(InvalidPhoneNumberError);
  });

  it('should reject invalid email', () => {
    expect(() =>
      BusinessUnit.create({
        organizationId: 'org-1',
        publicName: 'Loja X',
        phoneNumber: '11999999999',
        phoneHasWhatsapp: true,
        email: 'invalid-email',
        address: baseAddress,
        status: 'PENDING_PRODUCTS',
      })
    ).toThrow(InvalidEmailError);
  });

  it('should reject invalid postal code', () => {
    expect(() =>
      BusinessUnit.create({
        organizationId: 'org-1',
        publicName: 'Loja X',
        phoneNumber: '11999999999',
        phoneHasWhatsapp: true,
        address: { ...baseAddress, postalCode: '123' },
        status: 'PENDING_PRODUCTS',
      })
    ).toThrow(InvalidPostalCodeError);
  });

  it('should reject invalid state', () => {
    expect(() =>
      BusinessUnit.create({
        organizationId: 'org-1',
        publicName: 'Loja X',
        phoneNumber: '11999999999',
        phoneHasWhatsapp: true,
        address: { ...baseAddress, state: 'XX' },
        status: 'PENDING_PRODUCTS',
      })
    ).toThrow(InvalidStateError);
  });

  it('should reject invalid country', () => {
    expect(() =>
      BusinessUnit.create({
        organizationId: 'org-1',
        publicName: 'Loja X',
        phoneNumber: '11999999999',
        phoneHasWhatsapp: true,
        address: { ...baseAddress, country: 'US' },
        status: 'PENDING_PRODUCTS',
      })
    ).toThrow(InvalidCountryError);
  });
});
