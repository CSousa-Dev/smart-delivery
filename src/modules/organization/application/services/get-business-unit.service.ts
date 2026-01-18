import { GetBusinessUnitInput, GetBusinessUnitOutput, VerticalSummary } from '../dtos/get-business-unit.dto';
import { BusinessUnitId } from '../../domain/entities/business-unit.entity';
import {
  BusinessUnitNotFoundError,
  InvalidBusinessUnitIdError,
} from '../../domain/errors/business-unit.errors';
import { BusinessUnitRepository } from '../../domain/repositories/business-unit.repository';
import { BusinessUnitVerticalRepository } from '../../domain/repositories/business-unit-vertical.repository';
import { VerticalRepository } from '../../domain/repositories/vertical.repository';

export class GetBusinessUnitService {
  constructor(
    private readonly businessUnitRepository: BusinessUnitRepository,
    private readonly businessUnitVerticalRepository: BusinessUnitVerticalRepository,
    private readonly verticalRepository: VerticalRepository
  ) {}

  async execute(input: GetBusinessUnitInput): Promise<GetBusinessUnitOutput> {
    if (!BusinessUnitId.isValid(input.businessUnitId)) {
      throw new InvalidBusinessUnitIdError(input.businessUnitId);
    }

    const unit = await this.businessUnitRepository.findById(input.businessUnitId);
    if (!unit) {
      throw new BusinessUnitNotFoundError(input.businessUnitId);
    }

    const verticalLinks = await this.businessUnitVerticalRepository.listByBusinessUnitId(
      input.businessUnitId
    );
    const verticalIds = verticalLinks.map((link) => link.getVerticalId());
    const verticals = await this.verticalRepository.listByIds(verticalIds);
    const verticalsById = new Map(verticals.map((vertical) => [vertical.getId(), vertical]));
    const verticalSummaries: VerticalSummary[] = verticalLinks
      .map((link) => {
        const vertical = verticalsById.get(link.getVerticalId());
        if (!vertical) {
          return null;
        }
        return {
          id: vertical.getId(),
          name: vertical.getName(),
          code: vertical.getCode(),
          description: vertical.getDescription(),
          status: link.getStatus(),
        };
      })
      .filter((item): item is VerticalSummary => item !== null);

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
      verticals: verticalSummaries,
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
