import { ListUsersService } from '../../../../src/modules/organization/application/services/list-users.service';
import { User } from '../../../../src/modules/organization/domain/entities/user.entity';
import { UserOrganizationLink } from '../../../../src/modules/organization/domain/entities/user-organization-link.entity';
import { UserOrganizationLinkRepository } from '../../../../src/modules/organization/domain/repositories/user-organization-link.repository';
import { UserRepository } from '../../../../src/modules/organization/domain/repositories/user.repository';

describe('ListUsersService', () => {
  const buildUser = (id: string, createdAt: Date) =>
    User.create({
      id,
      firstName: 'Ana',
      lastName: 'Silva',
      documentType: 'CPF',
      documentNumber: '12345678901',
      email: `${id}@example.com`,
      phoneNumber: '11999999999',
      emailOptIn: true,
      phoneOptIn: true,
      status: 'ACTIVE',
      createdAt,
    });

  const buildService = () => {
    const userRepository: UserRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      existsByDocumentNumber: jest.fn(),
      existsByEmail: jest.fn(),
      existsByPhoneNumber: jest.fn(),
      list: jest.fn().mockResolvedValue([buildUser('user-1', new Date())]),
      countAll: jest.fn().mockResolvedValue(1),
      listByOrganizationId: jest.fn(),
    };

    const userOrganizationLinkRepository: UserOrganizationLinkRepository = {
      save: jest.fn(),
      existsByUserId: jest.fn(),
      findByUserId: jest.fn(),
      listByUserIds: jest.fn().mockResolvedValue([]),
    };

    return {
      service: new ListUsersService(userRepository, userOrganizationLinkRepository),
      userRepository,
      userOrganizationLinkRepository,
    };
  };

  it('should normalize invalid pagination and sorting', async () => {
    const { service, userRepository } = buildService();

    await service.execute({ page: 0, pageSize: 120, sortDirection: 'invalid' });

    expect(userRepository.list).toHaveBeenCalledWith(1, 20, 'desc');
  });

  it('should return users with organizationId mapped', async () => {
    const { service, userOrganizationLinkRepository } = buildService();
    (userOrganizationLinkRepository.listByUserIds as jest.Mock).mockResolvedValue([
      UserOrganizationLink.restore({
        userId: 'user-1',
        organizationId: 'org-1',
        isOwner: true,
        createdAt: new Date(),
      }),
    ]);

    const output = await service.execute({ page: 1, pageSize: 20, sortDirection: 'desc' });

    const first = output.items[0];
    expect(first).toBeDefined();
    if (!first) {
      throw new Error('Expected at least one user item');
    }
    expect(first.organizationId).toBe('org-1');
    expect(output.totalItems).toBe(1);
  });

  it('should handle empty list', async () => {
    const { service, userRepository, userOrganizationLinkRepository } = buildService();
    (userRepository.list as jest.Mock).mockResolvedValue([]);
    (userRepository.countAll as jest.Mock).mockResolvedValue(0);
    (userOrganizationLinkRepository.listByUserIds as jest.Mock).mockResolvedValue([]);

    const output = await service.execute({});

    expect(output.items).toEqual([]);
    expect(output.totalItems).toBe(0);
    expect(output.totalPages).toBe(0);
  });
});
