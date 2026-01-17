import { Organization } from '../../../domain/entities/organization.entity';

export class OrganizationMapper {
  static toPersistence(organization: Organization) {
    return {
      id: organization.getId().value,
      tradeName: organization.getTradeName(),
      legalName: organization.getLegalName(),
      documentType: organization.getDocumentType(),
      documentNumber: organization.getDocumentNumber(),
      statusId: organization.getStatus(),
      ownerUserId: organization.getOwnerUserId(),
      createdAt: organization.getCreatedAt(),
      updatedAt: organization.getUpdatedAt(),
    };
  }
}
