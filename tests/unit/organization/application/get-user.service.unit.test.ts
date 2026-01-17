import { GetUserService } from '../../../../src/modules/organization/application/services/get-user.service';
import { User } from '../../../../src/modules/organization/domain/entities/user.entity';
import { InvalidUserIdError, UserNotFoundError } from '../../../../src/modules/organization/domain/errors/user.errors';
import { UserOrganizationLinkRepository } from '../../../../src/modules/organization/domain/repositories/user-organization-link.repository';
import { UserRepository } from '../../../../src/modules/organization/domain/repositories/user.repository';
import { UserOrganizationLink } from '../../../../src/modules/organization/domain/entities/user-organization-link.entity';

describe('GetUserService', () => {
  const buildUser = () =>
    User.create({
      id: '11111111-1111-4111-8111-111111111111',
      firstName: 'Ana',
      lastName: 'Silva',
      documentType: 'CPF',
      documentNumber: '12345678901',
      email: 'ana@example.com',
      phoneNumber: '11999999999',
      emailOptIn: true,
      phoneOptIn: true,
      status: 'ACTIVE',
    });

  const buildService = () => {
    const userRepository: UserRepository = {
      save: jest.fn(),
      findById: jest.fn().mockResolvedValue(buildUser()),
      existsByDocumentNumber: jest.fn(),
      existsByEmail: jest.fn(),
      existsByPhoneNumber: jest.fn(),
      list: jest.fn(),
      countAll: jest.fn(),
      listByOrganizationId: jest.fn(),
    };

    const userOrganizationLinkRepository: UserOrganizationLinkRepository = {
      save: jest.fn(),
      existsByUserId: jest.fn(),
      findByUserId: jest.fn().mockResolvedValue(null),
      listByUserIds: jest.fn(),
    };

    return {
      service: new GetUserService(userRepository, userOrganizationLinkRepository),
      userRepository,
      userOrganizationLinkRepository,
    };
  };

  it('should reject invalid user id', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        userId: 'invalid',
        actorUserId: '11111111-1111-4111-8111-111111111111',
      })
    ).rejects.toBeInstanceOf(InvalidUserIdError);
  });

  it('should reject when user does not exist', async () => {
    const { service, userRepository } = buildService();
    (userRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      service.execute({
        userId: '11111111-1111-4111-8111-111111111111',
        actorUserId: '11111111-1111-4111-8111-111111111111',
      })
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });

  it('should return user with organization link', async () => {
    const { service, userOrganizationLinkRepository } = buildService();
    (userOrganizationLinkRepository.findByUserId as jest.Mock).mockResolvedValue(
      UserOrganizationLink.restore({
        userId: '11111111-1111-4111-8111-111111111111',
        organizationId: 'org-1',
        isOwner: true,
        createdAt: new Date(),
      })
    );

    const output = await service.execute({
      userId: '11111111-1111-4111-8111-111111111111',
      actorUserId: '11111111-1111-4111-8111-111111111111',
    });

    expect(output.organizationId).toBe('org-1');
  });

  it('should return user without organization link', async () => {
    const { service } = buildService();

    const output = await service.execute({
      userId: '11111111-1111-4111-8111-111111111111',
      actorUserId: '11111111-1111-4111-8111-111111111111',
    });

    expect(output.organizationId).toBeNull();
  });
});
