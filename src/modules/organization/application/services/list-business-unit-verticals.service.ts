import {
  ListBusinessUnitVerticalsInput,
  ListBusinessUnitVerticalsOutput,
  BusinessUnitVerticalSummary,
} from '../dtos/list-business-unit-verticals.dto';
import { BusinessUnitRepository } from '../../domain/repositories/business-unit.repository';
import { BusinessUnitVerticalRepository } from '../../domain/repositories/business-unit-vertical.repository';
import { VerticalCatalogPort } from '../ports/vertical-catalog.port';
import { BusinessUnitNotFoundError } from '../../domain/errors/business-unit.errors';

export class ListBusinessUnitVerticalsService {
  constructor(
    private readonly businessUnitRepository: BusinessUnitRepository,
    private readonly businessUnitVerticalRepository: BusinessUnitVerticalRepository,
    private readonly verticalCatalog: VerticalCatalogPort
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
    const catalogList = await this.verticalCatalog.listAllActive();
    const catalogByCode = new Map(catalogList.map((v) => [v.code, v]));

    const items: BusinessUnitVerticalSummary[] = links
      .map((link) => {
        const catalog = catalogByCode.get(link.getVerticalCode());
        if (!catalog) return null;
        return {
          code: link.getVerticalCode(),
          name: catalog.name,
          description: catalog.description,
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
