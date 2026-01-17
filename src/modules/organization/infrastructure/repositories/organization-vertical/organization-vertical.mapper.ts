import { OrganizationVerticalLink } from '../../../domain/entities/organization-vertical-link.entity';

export class OrganizationVerticalMapper {
  static toPersistence(link: OrganizationVerticalLink) {
    return {
      organizationId: link.getOrganizationId(),
      verticalId: link.getVerticalId(),
      createdAt: link.getCreatedAt(),
    };
  }
}
