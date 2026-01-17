import { ListUsersInput, ListUsersOutput } from '../dtos/list-users.dto';
import { UserOrganizationLinkRepository } from '../../domain/repositories/user-organization-link.repository';
import { UserRepository } from '../../domain/repositories/user.repository';

export class ListUsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userOrganizationLinkRepository: UserOrganizationLinkRepository
  ) {}

  async execute(input: ListUsersInput): Promise<ListUsersOutput> {
    const page = input.page && input.page > 0 ? input.page : 1;
    const pageSize =
      input.pageSize && input.pageSize >= 1 && input.pageSize <= 100 ? input.pageSize : 20;
    const sortDirection =
      input.sortDirection === 'asc' || input.sortDirection === 'desc'
        ? input.sortDirection
        : 'desc';

    const users = await this.userRepository.list(page, pageSize, sortDirection);
    const totalItems = await this.userRepository.countAll();
    const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / pageSize);

    const userIds = users.map((user) => user.getId().value);
    const links = await this.userOrganizationLinkRepository.listByUserIds(userIds);
    const organizationByUserId = new Map(
      links.map((link) => [link.getUserId(), link.getOrganizationId()])
    );

    return {
      items: users.map((user) => ({
        id: user.getId().value,
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
        email: user.getEmail(),
        phoneNumber: user.getPhoneNumber(),
        status: user.getStatus(),
        organizationId: organizationByUserId.get(user.getId().value) ?? null,
        createdAt: user.getCreatedAt(),
      })),
      page,
      pageSize,
      totalItems,
      totalPages,
    };
  }
}
