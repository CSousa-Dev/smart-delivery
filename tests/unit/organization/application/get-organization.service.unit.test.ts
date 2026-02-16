import { GetOrganizationService } from '../../../../src/modules/organization/application/services/get-organization.service';
import { BusinessUnit } from '../../../../src/modules/organization/domain/entities/business-unit.entity';
import { Organization } from '../../../../src/modules/organization/domain/entities/organization.entity';
import { OrganizationVerticalLink } from '../../../../src/modules/organization/domain/entities/organization-vertical-link.entity';
import {
  InvalidOrganizationIdError,
  OrganizationNotFoundError,
} from '../../../../src/modules/organization/domain/errors/organization.errors';
import { BusinessUnitRepository } from '../../../../src/modules/organization/domain/repositories/business-unit.repository';
import { OrganizationRepository } from '../../../../src/modules/organization/domain/repositories/organization.repository';
import { OrganizationVerticalRepository } from '../../../../src/modules/organization/domain/repositories/organization-vertical.repository';
import { UserRepository } from '../../../../src/modules/organization/domain/repositories/user.repository';
import { User } from '../../../../src/modules/organization/domain/entities/user.entity';
import { VerticalCatalogPort } from '../../../../src/modules/organization/application/ports/vertical-catalog.port';

describe('GetOrganizationService', () => {
  const organization = Organization.create({
    id: '11111111-1111-4111-8111-111111111111',
    tradeName: 'Loja X',
    legalName: 'Loja X LTDA',
    documentType: 'CNPJ',
    documentNumber: '12345678901234',
    ownerUserId: 'user-1',
    verticalCodes: ['v1'],
    status: 'ACTIVE',
  });

  const buildService = () => {
    const organizationRepository: OrganizationRepository = {
      save: jest.fn(),
      existsById: jest.fn(),
      existsByDocumentNumber: jest.fn(),
      findById: jest.fn().mockResolvedValue(organization),
      update: jest.fn(),
      updateStatus: jest.fn(),
      list: jest.fn(),
      countAll: jest.fn(),
    };

    const organizationVerticalRepository: OrganizationVerticalRepository = {
      saveMany: jest.fn(),
      save: jest.fn(),
      listByOrganizationId: jest.fn().mockResolvedValue([
        OrganizationVerticalLink.restore({
          organizationId: organization.getId().value,
          verticalCode: 'v1',
          status: 'ACTIVE',
          createdAt: new Date(),
        }),
      ]),
      listByOrganizationIds: jest.fn(),
      listActiveByOrganizationId: jest.fn(),
      findByOrganizationAndVerticalCode: jest.fn(),
      findActiveByOrganizationAndVerticalCode: jest.fn(),
      existsActiveByOrganizationAndVerticalCode: jest.fn(),
      updateStatus: jest.fn(),
      countActiveByOrganizationId: jest.fn(),
    };

    const verticalCatalog: VerticalCatalogPort = {
      listAllActive: jest.fn().mockResolvedValue([{ code: 'v1', name: 'V1', description: 'd1' }]),
      validateCodes: jest.fn().mockResolvedValue(true),
    };

    const businessUnitRepository: BusinessUnitRepository = {
      save: jest.fn(),
      countByOrganizationId: jest.fn(),
      listByOrganizationId: jest.fn().mockResolvedValue([
        BusinessUnit.create({
          id: 'unit-1',
          organizationId: organization.getId().value,
          publicName: 'Loja X',
          phoneNumber: '11999999999',
          phoneHasWhatsapp: true,
          address: {
            street: 'Rua A',
            number: '123',
            neighborhood: 'Centro',
            city: 'Sao Paulo',
            state: 'SP',
            postalCode: '01001000',
            country: 'BR',
            referencePoint: 'Proximo ao mercado',
          },
          status: 'PENDING_PRODUCTS',
        }),
      ]),
      findById: jest.fn(),
      list: jest.fn(),
      countAll: jest.fn(),
    };

    const userRepository: UserRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      existsByDocumentNumber: jest.fn(),
      existsByEmail: jest.fn(),
      existsByPhoneNumber: jest.fn(),
      list: jest.fn(),
      countAll: jest.fn(),
      listByOrganizationId: jest.fn().mockResolvedValue([
        User.create({
          id: 'user-1',
          firstName: 'Ana',
          lastName: 'Silva',
          documentType: 'CPF',
          documentNumber: '12345678901',
          email: 'ana@example.com',
          phoneNumber: '11999999999',
          emailOptIn: true,
          phoneOptIn: true,
          status: 'ACTIVE',
        }),
      ]),
    };

    return {
      service: new GetOrganizationService(
        organizationRepository,
        organizationVerticalRepository,
        businessUnitRepository,
        userRepository,
        verticalCatalog
      ),
      organizationRepository,
      organizationVerticalRepository,
      businessUnitRepository,
      userRepository,
      verticalCatalog,
    };
  };

  it('should reject invalid organization id', async () => {
    const { service } = buildService();

    await expect(
      service.execute({ organizationId: 'invalid', include: '' })
    ).rejects.toBeInstanceOf(InvalidOrganizationIdError);
  });

  it('should reject when organization not found', async () => {
    const { service, organizationRepository } = buildService();
    (organizationRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      service.execute({ organizationId: organization.getId().value })
    ).rejects.toBeInstanceOf(OrganizationNotFoundError);
  });

  it('should return organization without includes', async () => {
    const { service } = buildService();

    const output = await service.execute({
      organizationId: organization.getId().value,
    });

    expect(output.businessUnits).toBeUndefined();
    expect(output.users).toBeUndefined();
    expect(output.verticals.map((v) => v.code)).toEqual(['v1']);
  });

  it('should return organization with business units and users', async () => {
    const { service } = buildService();

    const output = await service.execute({
      organizationId: organization.getId().value,
      include: 'businessUnits,users',
    });

    expect(output.businessUnits?.length).toBe(1);
    expect(output.users?.length).toBe(1);
  });

  it('should ignore invalid include values', async () => {
    const { service } = buildService();

    const output = await service.execute({
      organizationId: organization.getId().value,
      include: 'businessUnits,foo,users,users',
    });

    expect(output.businessUnits?.length).toBe(1);
    expect(output.users?.length).toBe(1);
  });
});
