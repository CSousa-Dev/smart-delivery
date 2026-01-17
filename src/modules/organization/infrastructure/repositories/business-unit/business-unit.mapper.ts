import { BusinessUnit } from '../../../domain/entities/business-unit.entity';

export class BusinessUnitMapper {
  static toPersistence(unit: BusinessUnit) {
    const address = unit.getAddress();

    return {
      id: unit.getId().value,
      organizationId: unit.getOrganizationId(),
      publicName: unit.getPublicName(),
      phoneNumber: unit.getPhoneNumber(),
      phoneHasWhatsapp: unit.getPhoneHasWhatsapp(),
      email: unit.getEmail(),
      instagram: unit.getInstagram(),
      website: unit.getWebsite(),
      statusId: unit.getStatus(),
      createdAt: unit.getCreatedAt(),
      updatedAt: unit.getUpdatedAt(),
      address: {
        create: {
          street: address.street,
          number: address.number,
          complement: address.complement,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country,
          referencePoint: address.referencePoint,
        },
      },
    };
  }
}
