import { OrganizationVerticalLink } from '../../../domain/entities/organization-vertical-link.entity';

export class OrganizationVerticalMapper {
  static toPersistence(link: OrganizationVerticalLink) {
    return {
      organizationId: link.getOrganizationId(),
      verticalCode: link.getVerticalCode(),
      statusId: link.getStatus(),
      createdAt: link.getCreatedAt(),
      updatedAt: link.getUpdatedAt(),
    };
  }
}
