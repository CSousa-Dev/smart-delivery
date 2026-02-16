import { BusinessUnitVerticalLink } from '../../../domain/entities/business-unit-vertical-link.entity';
import { VerticalLinkStatusValue } from '../../../domain/entities/vertical-link-status';

export class BusinessUnitVerticalMapper {
  static toPersistence(link: BusinessUnitVerticalLink) {
    return {
      businessUnitId: link.getBusinessUnitId(),
      organizationId: link.getOrganizationId(),
      verticalCode: link.getVerticalCode(),
      statusId: link.getStatus(),
      createdAt: link.getCreatedAt(),
      updatedAt: link.getUpdatedAt(),
    };
  }

  static toDomain(raw: {
    businessUnitId: string;
    organizationId: string;
    verticalCode: string;
    statusId: string;
    createdAt: Date;
    updatedAt: Date | null;
  }): BusinessUnitVerticalLink {
    return BusinessUnitVerticalLink.restore({
      businessUnitId: raw.businessUnitId,
      organizationId: raw.organizationId,
      verticalCode: raw.verticalCode,
      status: raw.statusId as VerticalLinkStatusValue,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
