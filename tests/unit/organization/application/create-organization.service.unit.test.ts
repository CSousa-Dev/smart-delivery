import { CreateOrganizationService } from '../../../../src/modules/organization/application/services/create-organization.service';
import { User } from '../../../../src/modules/organization/domain/entities/user.entity';
import {
  MissingLegalNameError,
  OwnerUserNotFoundError,
  UserAlreadyLinkedError,
  VerticalNotRegisteredError,
} from '../../../../src/modules/organization/domain/errors/organization.errors';
import { DocumentAlreadyExistsError } from '../../../../src/modules/organization/domain/errors/user.errors';
import { OrganizationRepository } from '../../../../src/modules/organization/domain/repositories/organization.repository';
import {
  OrganizationUnitOfWork,
  OrganizationUnitOfWorkRepositories,
} from '../../../../src/modules/organization/domain/repositories/organization-unit-of-work';
import { OrganizationVerticalRepository } from '../../../../src/modules/organization/domain/repositories/organization-vertical.repository';
import { UserOrganizationLinkRepository } from '../../../../src/modules/organization/domain/repositories/user-organization-link.repository';
import { UserRepository } from '../../../../src/modules/organization/domain/repositories/user.repository';
import { VerticalRepository } from '../../../../src/modules/organization/domain/repositories/vertical.repository';

describe('CreateOrganizationService', () => {
  const buildOwner = () =>
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
      status: 'ORG_LINKED',
    });

  const buildService = () => {
    const organizationRepository: OrganizationRepository = {
      save: jest.fn(),
      existsById: jest.fn(),
      existsByDocumentNumber: jest.fn().mockResolvedValue(false),
      findById: jest.fn(),
      updateStatus: jest.fn(),
      list: jest.fn(),
      countAll: jest.fn(),
    };

    const userRepository: UserRepository = {
      save: jest.fn(),
      findById: jest.fn().mockResolvedValue(buildOwner()),
      existsByDocumentNumber: jest.fn().mockResolvedValue(false),
      existsByEmail: jest.fn(),
      existsByPhoneNumber: jest.fn(),
      list: jest.fn(),
      countAll: jest.fn(),
      listByOrganizationId: jest.fn(),
    };

    const userOrganizationLinkRepository: UserOrganizationLinkRepository = {
      save: jest.fn(),
      existsByUserId: jest.fn().mockResolvedValue(false),
      findByUserId: jest.fn(),
      listByUserIds: jest.fn(),
    };

    const verticalRepository: VerticalRepository = {
      existsByIds: jest.fn().mockResolvedValue(true),
    };

    const transactionRepositories: OrganizationUnitOfWorkRepositories = {
      businessUnitRepository: {
        save: jest.fn(),
        countByOrganizationId: jest.fn(),
        listByOrganizationId: jest.fn(),
        findById: jest.fn(),
        list: jest.fn(),
        countAll: jest.fn(),
      },
      organizationRepository,
      organizationVerticalRepository: {
        saveMany: jest.fn(),
        listByOrganizationId: jest.fn(),
        listByOrganizationIds: jest.fn(),
      } as OrganizationVerticalRepository,
      userRepository,
      userOrganizationLinkRepository,
    };

    const unitOfWork: OrganizationUnitOfWork = {
      withTransaction: jest.fn(async (operation) => operation(transactionRepositories)),
    };

    return {
      service: new CreateOrganizationService(
        organizationRepository,
        userRepository,
        userOrganizationLinkRepository,
        verticalRepository,
        unitOfWork
      ),
      organizationRepository,
      userRepository,
      userOrganizationLinkRepository,
      verticalRepository,
      unitOfWork,
      transactionRepositories,
    };
  };

  it('should reject when owner user does not exist', async () => {
    const { service, userRepository } = buildService();
    (userRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      service.execute({
        tradeName: 'Loja X',
        documentType: 'CPF',
        documentNumber: '12345678901',
        ownerUserId: 'user-1',
        verticalIds: ['vert-1'],
      })
    ).rejects.toBeInstanceOf(OwnerUserNotFoundError);
  });

  it('should reject when user is already linked', async () => {
    const { service, userOrganizationLinkRepository } = buildService();
    (userOrganizationLinkRepository.existsByUserId as jest.Mock).mockResolvedValue(true);

    await expect(
      service.execute({
        tradeName: 'Loja X',
        documentType: 'CPF',
        documentNumber: '12345678901',
        ownerUserId: 'user-1',
        verticalIds: ['vert-1'],
      })
    ).rejects.toBeInstanceOf(UserAlreadyLinkedError);
  });

  it('should reject duplicated document', async () => {
    const { service, organizationRepository } = buildService();
    (organizationRepository.existsByDocumentNumber as jest.Mock).mockResolvedValue(true);

    await expect(
      service.execute({
        tradeName: 'Loja X',
        documentType: 'CPF',
        documentNumber: '12345678901',
        ownerUserId: 'user-1',
        verticalIds: ['vert-1'],
      })
    ).rejects.toBeInstanceOf(DocumentAlreadyExistsError);
  });

  it('should reject when legal name is missing for CNPJ', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        tradeName: 'Loja X',
        documentType: 'CNPJ',
        documentNumber: '12345678901234',
        ownerUserId: 'user-1',
        verticalIds: ['vert-1'],
      })
    ).rejects.toBeInstanceOf(MissingLegalNameError);
  });

  it('should reject when vertical is not registered', async () => {
    const { service, verticalRepository } = buildService();
    (verticalRepository.existsByIds as jest.Mock).mockResolvedValue(false);

    await expect(
      service.execute({
        tradeName: 'Loja X',
        documentType: 'CPF',
        documentNumber: '12345678901',
        ownerUserId: 'user-1',
        verticalIds: ['vert-1'],
      })
    ).rejects.toBeInstanceOf(VerticalNotRegisteredError);
  });

  it('should create organization and owner link', async () => {
    const { service, unitOfWork, transactionRepositories } = buildService();

    const output = await service.execute({
      tradeName: 'Loja X',
      legalName: 'Loja X LTDA',
      documentType: 'CNPJ',
      documentNumber: '12345678901234',
      ownerUserId: 'user-1',
      verticalIds: ['vert-1', 'vert-2'],
    });

    expect(output.status).toBe('PENDING_BUSINESS_UNIT');
    expect(unitOfWork.withTransaction).toHaveBeenCalledTimes(1);
    expect(transactionRepositories.organizationRepository.save).toHaveBeenCalledTimes(1);
    expect(transactionRepositories.userRepository.save).toHaveBeenCalledTimes(1);
    expect(transactionRepositories.userOrganizationLinkRepository.save).toHaveBeenCalledTimes(1);
    expect(transactionRepositories.organizationVerticalRepository.saveMany).toHaveBeenCalledTimes(1);
  });
});
