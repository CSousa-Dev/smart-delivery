import {
  ListBusinessUnitVerticalsInput,
  ListBusinessUnitVerticalsOutput,
  BusinessUnitVerticalSummary,
} from '../dtos/list-business-unit-verticals.dto';
import { BusinessUnitRepository } from '../../domain/repositories/business-unit.repository';
import { BusinessUnitVerticalRepository } from '../../domain/repositories/business-unit-vertical.repository';
import { VerticalRepository } from '../../domain/repositories/vertical.repository';
import { BusinessUnitNotFoundError } from '../../domain/errors/business-unit.errors';

export class ListBusinessUnitVerticalsService {
  constructor(
    private readonly businessUnitRepository: BusinessUnitRepository,
    private readonly businessUnitVerticalRepository: BusinessUnitVerticalRepository,
    private readonly verticalRepository: VerticalRepository
  ) {}

  async execute(
    input: ListBusinessUnitVerticalsInput
  ): Promise<ListBusinessUnitVerticalsOutput> {
    const businessUnit = await this.businessUnitRepository.findById(input.businessUnitId);
    if (!businessUnit) {
      throw new BusinessUnitNotFoundError(input.businessUnitId);
    }

    const links = await this.businessUnitVerticalRepository.listByBusinessUnitId(
      input.businessUnitId
    );
    const verticalIds = links.map((link) => link.getVerticalId());
    const verticals = await this.verticalRepository.listByIds(verticalIds);
    const verticalsById = new Map(verticals.map((vertical) => [vertical.getId(), vertical]));

    const items: BusinessUnitVerticalSummary[] = links
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
      .filter((item): item is BusinessUnitVerticalSummary => item !== null);

    return {
      businessUnitId: input.businessUnitId,
      organizationId: businessUnit.getOrganizationId(),
      items,
    };
  }
}
