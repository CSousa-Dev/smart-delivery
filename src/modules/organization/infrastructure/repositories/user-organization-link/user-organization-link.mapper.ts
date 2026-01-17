import { UserOrganizationLink } from '../../../domain/entities/user-organization-link.entity';

export class UserOrganizationLinkMapper {
  static toPersistence(link: UserOrganizationLink) {
    return {
      userId: link.getUserId(),
      organizationId: link.getOrganizationId(),
      isOwner: link.getIsOwner(),
      createdAt: link.getCreatedAt(),
    };
  }
}
