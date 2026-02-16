import { Organization } from '../../../../src/modules/organization/domain/entities/organization.entity';
import { MissingLegalNameError } from '../../../../src/modules/organization/domain/errors/organization.errors';
import { InvalidDocumentError } from '../../../../src/modules/organization/domain/errors/user.errors';

describe('Organization Entity', () => {
  it('should create organization with CPF', () => {
    const organization = Organization.create({
      tradeName: 'Loja X',
      documentType: 'CPF',
      documentNumber: '12345678901',
      ownerUserId: 'user-1',
      verticalCodes: ['vert-1'],
      status: 'PENDING_BUSINESS_UNIT',
    });

    expect(organization.getDocumentType()).toBe('CPF');
    expect(organization.getDocumentNumber()).toBe('12345678901');
    expect(organization.getLegalName()).toBeNull();
  });

  it('should require legal name for CNPJ', () => {
    expect(() =>
      Organization.create({
        tradeName: 'Loja X',
        documentType: 'CNPJ',
        documentNumber: '12345678901234',
        ownerUserId: 'user-1',
        verticalCodes: ['vert-1'],
        status: 'PENDING_BUSINESS_UNIT',
      })
    ).toThrow(MissingLegalNameError);
  });

  it('should reject invalid document', () => {
    expect(() =>
      Organization.create({
        tradeName: 'Loja X',
        documentType: 'CPF',
        documentNumber: '123',
        ownerUserId: 'user-1',
        verticalCodes: ['vert-1'],
        status: 'PENDING_BUSINESS_UNIT',
      })
    ).toThrow(InvalidDocumentError);
  });
});
