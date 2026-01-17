import { CreateUserService } from '../../../../src/modules/organization/application/services/create-user.service';
import { OrganizationNotFoundError } from '../../../../src/modules/organization/domain/errors/organization.errors';
import {
  DocumentAlreadyExistsError,
  EmailAlreadyExistsError,
  PhoneAlreadyExistsError,
} from '../../../../src/modules/organization/domain/errors/user.errors';
import { OrganizationRepository } from '../../../../src/modules/organization/domain/repositories/organization.repository';
import {
  OrganizationUnitOfWork,
  OrganizationUnitOfWorkRepositories,
} from '../../../../src/modules/organization/domain/repositories/organization-unit-of-work';
import { UserRepository } from '../../../../src/modules/organization/domain/repositories/user.repository';
import { UserOrganizationLinkRepository } from '../../../../src/modules/organization/domain/repositories/user-organization-link.repository';

describe('CreateUserService', () => {
  const buildService = () => {
    const userRepository: UserRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      existsByDocumentNumber: jest.fn().mockResolvedValue(false),
      existsByEmail: jest.fn().mockResolvedValue(false),
      existsByPhoneNumber: jest.fn().mockResolvedValue(false),
      list: jest.fn(),
      countAll: jest.fn(),
      listByOrganizationId: jest.fn(),
    };

    const organizationRepository: OrganizationRepository = {
      save: jest.fn(),
      existsById: jest.fn().mockResolvedValue(true),
      existsByDocumentNumber: jest.fn().mockResolvedValue(false),
      findById: jest.fn(),
      updateStatus: jest.fn(),
      list: jest.fn(),
      countAll: jest.fn(),
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
      organizationRepository: {
        save: jest.fn(),
        existsById: jest.fn(),
        existsByDocumentNumber: jest.fn(),
        findById: jest.fn(),
        updateStatus: jest.fn(),
        list: jest.fn(),
        countAll: jest.fn(),
      },
      organizationVerticalRepository: {
        saveMany: jest.fn(),
        listByOrganizationId: jest.fn(),
        listByOrganizationIds: jest.fn(),
      },
      userRepository,
      userOrganizationLinkRepository: {
        save: jest.fn(),
        existsByUserId: jest.fn(),
        findByUserId: jest.fn(),
        listByUserIds: jest.fn(),
      } as UserOrganizationLinkRepository,
    };

    const unitOfWork: OrganizationUnitOfWork = {
      withTransaction: jest.fn(async (operation) => operation(transactionRepositories)),
    };

    return {
      service: new CreateUserService(userRepository, organizationRepository, unitOfWork),
      userRepository,
      organizationRepository,
      unitOfWork,
      transactionRepositories,
    };
  };

  it('should reject duplicated document number in users', async () => {
    const { service, userRepository } = buildService();
    (userRepository.existsByDocumentNumber as jest.Mock).mockResolvedValue(true);

    await expect(
      service.execute({
        firstName: 'Ana',
        lastName: 'Silva',
        documentType: 'CPF',
        documentNumber: '12345678901',
        email: 'ana@example.com',
        phoneNumber: '11999999999',
        emailOptIn: true,
        phoneOptIn: true,
      })
    ).rejects.toBeInstanceOf(DocumentAlreadyExistsError);
  });

  it('should reject duplicated document number in organizations', async () => {
    const { service, organizationRepository } = buildService();
    (organizationRepository.existsByDocumentNumber as jest.Mock).mockResolvedValue(true);

    await expect(
      service.execute({
        firstName: 'Ana',
        lastName: 'Silva',
        documentType: 'CPF',
        documentNumber: '12345678901',
        email: 'ana@example.com',
        phoneNumber: '11999999999',
        emailOptIn: true,
        phoneOptIn: true,
      })
    ).rejects.toBeInstanceOf(DocumentAlreadyExistsError);
  });

  it('should reject duplicated email', async () => {
    const { service, userRepository } = buildService();
    (userRepository.existsByEmail as jest.Mock).mockResolvedValue(true);

    await expect(
      service.execute({
        firstName: 'Ana',
        lastName: 'Silva',
        documentType: 'CPF',
        documentNumber: '12345678901',
        email: 'ana@example.com',
        phoneNumber: '11999999999',
        emailOptIn: true,
        phoneOptIn: true,
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  });

  it('should reject duplicated phone number', async () => {
    const { service, userRepository } = buildService();
    (userRepository.existsByPhoneNumber as jest.Mock).mockResolvedValue(true);

    await expect(
      service.execute({
        firstName: 'Ana',
        lastName: 'Silva',
        documentType: 'CPF',
        documentNumber: '12345678901',
        email: 'ana@example.com',
        phoneNumber: '11999999999',
        emailOptIn: true,
        phoneOptIn: true,
      })
    ).rejects.toBeInstanceOf(PhoneAlreadyExistsError);
  });

  it('should reject when organization does not exist', async () => {
    const { service, organizationRepository } = buildService();
    (organizationRepository.existsById as jest.Mock).mockResolvedValue(false);

    await expect(
      service.execute({
        firstName: 'Ana',
        lastName: 'Silva',
        documentType: 'CPF',
        documentNumber: '12345678901',
        email: 'ana@example.com',
        phoneNumber: '11999999999',
        emailOptIn: true,
        phoneOptIn: true,
        organizationId: 'org-1',
      })
    ).rejects.toBeInstanceOf(OrganizationNotFoundError);
  });

  it('should create user without organization link', async () => {
    const { service, transactionRepositories, unitOfWork } = buildService();

    const output = await service.execute({
      firstName: 'Ana',
      lastName: 'Silva',
      documentType: 'CPF',
      documentNumber: '12345678901',
      email: 'ana@example.com',
      phoneNumber: '11999999999',
      emailOptIn: true,
      phoneOptIn: true,
    });

    expect(output.status).toBe('PENDING_ORG_LINK');
    expect(unitOfWork.withTransaction).toHaveBeenCalledTimes(1);
    expect(transactionRepositories.userRepository.save).toHaveBeenCalledTimes(1);
    expect(transactionRepositories.userOrganizationLinkRepository.save).not.toHaveBeenCalled();
  });

  it('should create user with organization link', async () => {
    const { service, transactionRepositories } = buildService();

    const output = await service.execute({
      firstName: 'Ana',
      lastName: 'Silva',
      documentType: 'CPF',
      documentNumber: '12345678901',
      email: 'ana@example.com',
      phoneNumber: '11999999999',
      emailOptIn: true,
      phoneOptIn: true,
      organizationId: 'org-1',
    });

    expect(output.status).toBe('ORG_LINKED');
    expect(transactionRepositories.userRepository.save).toHaveBeenCalledTimes(1);
    expect(transactionRepositories.userOrganizationLinkRepository.save).toHaveBeenCalledTimes(1);
  });
});
