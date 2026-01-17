import { GetBusinessUnitInput, GetBusinessUnitOutput } from '../dtos/get-business-unit.dto';
import { BusinessUnitId } from '../../domain/entities/business-unit.entity';
import {
  BusinessUnitNotFoundError,
  InvalidBusinessUnitIdError,
} from '../../domain/errors/business-unit.errors';
import { BusinessUnitRepository } from '../../domain/repositories/business-unit.repository';

export class GetBusinessUnitService {
  constructor(private readonly businessUnitRepository: BusinessUnitRepository) {}

  async execute(input: GetBusinessUnitInput): Promise<GetBusinessUnitOutput> {
    if (!BusinessUnitId.isValid(input.businessUnitId)) {
      throw new InvalidBusinessUnitIdError(input.businessUnitId);
    }

    const unit = await this.businessUnitRepository.findById(input.businessUnitId);
    if (!unit) {
      throw new BusinessUnitNotFoundError(input.businessUnitId);
    }

    return {
      id: unit.getId().value,
      organizationId: unit.getOrganizationId(),
      publicName: unit.getPublicName(),
      phoneNumber: unit.getPhoneNumber(),
      phoneHasWhatsapp: unit.getPhoneHasWhatsapp(),
      email: unit.getEmail(),
      instagram: unit.getInstagram(),
      website: unit.getWebsite(),
      status: unit.getStatus(),
      address: {
        street: unit.getAddress().street,
        number: unit.getAddress().number,
        complement: unit.getAddress().complement,
        neighborhood: unit.getAddress().neighborhood,
        city: unit.getAddress().city,
        state: unit.getAddress().state,
        postalCode: unit.getAddress().postalCode,
        country: unit.getAddress().country,
        referencePoint: unit.getAddress().referencePoint,
      },
      createdAt: unit.getCreatedAt(),
      updatedAt: unit.getUpdatedAt(),
    };
  }
}
