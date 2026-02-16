import { UpdateOrganizationService } from '../../../../src/modules/organization/application/services/update-organization.service';
import {
  MissingLegalNameError,
  OrganizationNotFoundError,
} from '../../../../src/modules/organization/domain/errors/organization.errors';
import { Organization } from '../../../../src/modules/organization/domain/entities/organization.entity';
import { OrganizationRepository } from '../../../../src/modules/organization/domain/repositories/organization.repository';
import { OrganizationVerticalRepository } from '../../../../src/modules/organization/domain/repositories/organization-vertical.repository';

describe('UpdateOrganizationService', () => {
  const buildOrganization = () =>
    Organization.create({
      id: 'org-1',
      tradeName: 'Loja X',
      legalName: 'Loja X LTDA',
      documentType: 'CNPJ',
      documentNumber: '12345678901234',
      ownerUserId: null,
      verticalCodes: ['v1'],
      status: 'PENDING_BUSINESS_UNIT',
    });

  const buildService = () => {
    const organizationRepository: OrganizationRepository = {
      save: jest.fn(),
      existsById: jest.fn(),
      existsByDocumentNumber: jest.fn(),
      findById: jest.fn().mockResolvedValue(buildOrganization()),
      update: jest.fn(),
      updateStatus: jest.fn(),
      list: jest.fn(),
      countAll: jest.fn(),
    };

    const organizationVerticalRepository: OrganizationVerticalRepository = {
      saveMany: jest.fn(),
      save: jest.fn(),
      listByOrganizationId: jest.fn().mockResolvedValue([]),
      listByOrganizationIds: jest.fn(),
      listActiveByOrganizationId: jest.fn(),
      findByOrganizationAndVerticalCode: jest.fn(),
      findActiveByOrganizationAndVerticalCode: jest.fn(),
      existsActiveByOrganizationAndVerticalCode: jest.fn(),
      updateStatus: jest.fn(),
      countActiveByOrganizationId: jest.fn(),
    };

    return {
      service: new UpdateOrganizationService(
        organizationRepository,
        organizationVerticalRepository
      ),
      organizationRepository,
      organizationVerticalRepository,
    };
  };

  it('should reject when organization does not exist', async () => {
    const { service, organizationRepository } = buildService();
    (organizationRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      service.execute({
        organizationId: 'org-1',
        tradeName: 'Loja Y',
      })
    ).rejects.toBeInstanceOf(OrganizationNotFoundError);
  });

  it('should reject when CNPJ organization has legalName cleared', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        organizationId: 'org-1',
        legalName: null,
      })
    ).rejects.toBeInstanceOf(MissingLegalNameError);
  });

  it('should update tradeName and legalName', async () => {
    const { service, organizationRepository } = buildService();
    const updatedOrg = Organization.create({
      id: 'org-1',
      tradeName: 'Loja Y',
      legalName: 'Loja Y LTDA',
      documentType: 'CNPJ',
      documentNumber: '12345678901234',
      ownerUserId: null,
      verticalCodes: [],
      status: 'PENDING_BUSINESS_UNIT',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    (organizationRepository.findById as jest.Mock)
      .mockResolvedValueOnce(buildOrganization())
      .mockResolvedValueOnce(updatedOrg);

    const output = await service.execute({
      organizationId: 'org-1',
      tradeName: 'Loja Y',
      legalName: 'Loja Y LTDA',
    });

    expect(output.tradeName).toBe('Loja Y');
    expect(output.legalName).toBe('Loja Y LTDA');
    expect(organizationRepository.update).toHaveBeenCalledWith('org-1', {
      tradeName: 'Loja Y',
      legalName: 'Loja Y LTDA',
    });
  });
});
