import { CreateBusinessUnitService } from '../../../../src/modules/organization/application/services/create-business-unit.service';
import { BusinessUnitRepository } from '../../../../src/modules/organization/domain/repositories/business-unit.repository';
import { OrganizationRepository } from '../../../../src/modules/organization/domain/repositories/organization.repository';
import {
  OrganizationUnitOfWork,
  OrganizationUnitOfWorkRepositories,
} from '../../../../src/modules/organization/domain/repositories/organization-unit-of-work';
import { OrganizationNotFoundError } from '../../../../src/modules/organization/domain/errors/organization.errors';
import { UserNotOwnerError } from '../../../../src/modules/organization/domain/errors/business-unit.errors';
import { Organization } from '../../../../src/modules/organization/domain/entities/organization.entity';
import { OrganizationVerticalLink } from '../../../../src/modules/organization/domain/entities/organization-vertical-link.entity';

describe('CreateBusinessUnitService', () => {
  const organization = Organization.create({
    id: 'org-1',
    tradeName: 'Loja X',
    legalName: 'Loja X LTDA',
    documentType: 'CNPJ',
    documentNumber: '12345678901234',
    ownerUserId: 'user-1',
    verticalIds: ['vert-1'],
    status: 'PENDING_BUSINESS_UNIT',
  });

  const buildService = () => {
    const businessUnitRepository: BusinessUnitRepository = {
      save: jest.fn(),
      countByOrganizationId: jest.fn().mockResolvedValue(0),
      listByOrganizationId: jest.fn(),
      findById: jest.fn(),
      list: jest.fn(),
      countAll: jest.fn(),
    };

    const organizationRepository: OrganizationRepository = {
      save: jest.fn(),
      existsById: jest.fn(),
      existsByDocumentNumber: jest.fn(),
      findById: jest.fn().mockResolvedValue(organization),
      updateStatus: jest.fn(),
      list: jest.fn(),
      countAll: jest.fn(),
    };

    const transactionRepositories: OrganizationUnitOfWorkRepositories = {
      businessUnitRepository,
      businessUnitVerticalRepository: {
        saveMany: jest.fn(),
        save: jest.fn(),
        listByBusinessUnitId: jest.fn(),
        findByBusinessUnitAndVerticalId: jest.fn(),
        findActiveByBusinessUnitAndVerticalId: jest.fn(),
        updateStatus: jest.fn(),
        countActiveByBusinessUnitId: jest.fn(),
      },
      organizationRepository,
      organizationVerticalRepository: {
        saveMany: jest.fn(),
        listByOrganizationId: jest.fn(),
        listByOrganizationIds: jest.fn(),
        listActiveByOrganizationId: jest.fn().mockResolvedValue([
          OrganizationVerticalLink.restore({
            organizationId: 'org-1',
            verticalId: 'vert-1',
            status: 'ACTIVE',
            createdAt: new Date(),
          }),
        ]),
        save: jest.fn(),
        findByOrganizationAndVerticalId: jest.fn(),
        findActiveByOrganizationAndVerticalId: jest.fn(),
        existsActiveByOrganizationAndVerticalId: jest.fn(),
        updateStatus: jest.fn(),
        countActiveByOrganizationId: jest.fn(),
      },
      userRepository: {
        save: jest.fn(),
        findById: jest.fn(),
        existsByDocumentNumber: jest.fn(),
        existsByEmail: jest.fn(),
        existsByPhoneNumber: jest.fn(),
        list: jest.fn(),
        countAll: jest.fn(),
        listByOrganizationId: jest.fn(),
      },
      userOrganizationLinkRepository: {
        save: jest.fn(),
        existsByUserId: jest.fn(),
        findByUserId: jest.fn(),
        listByUserIds: jest.fn(),
      },
    };

    const unitOfWork: OrganizationUnitOfWork = {
      withTransaction: jest.fn(async (operation) => operation(transactionRepositories)),
    };

    return {
      service: new CreateBusinessUnitService(
        businessUnitRepository,
        transactionRepositories.businessUnitVerticalRepository as any,
        organizationRepository,
        transactionRepositories.organizationVerticalRepository as any,
        unitOfWork
      ),
      businessUnitRepository,
      organizationRepository,
      unitOfWork,
      transactionRepositories,
    };
  };

  const baseInput = {
    organizationId: 'org-1',
    actorUserId: 'user-1',
    verticalIds: ['vert-1'],
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
  };

  it('should reject when organization does not exist', async () => {
    const { service, organizationRepository } = buildService();
    (organizationRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(service.execute(baseInput)).rejects.toBeInstanceOf(
      OrganizationNotFoundError
    );
  });

  it('should reject when user is not owner', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        ...baseInput,
        actorUserId: 'user-2',
      })
    ).rejects.toBeInstanceOf(UserNotOwnerError);
  });

  it('should create business unit and activate organization on first unit', async () => {
    const { service, transactionRepositories } = buildService();

    const output = await service.execute(baseInput);

    expect(output.status).toBe('PENDING_PRODUCTS');
    expect(transactionRepositories.businessUnitRepository.save).toHaveBeenCalledTimes(1);
    expect(transactionRepositories.organizationRepository.updateStatus).toHaveBeenCalledTimes(1);
  });

  it('should not update organization status when not first unit', async () => {
    const { service, businessUnitRepository, transactionRepositories } = buildService();
    (businessUnitRepository.countByOrganizationId as jest.Mock).mockResolvedValue(1);

    await service.execute(baseInput);

    expect(transactionRepositories.organizationRepository.updateStatus).not.toHaveBeenCalled();
  });
});
