import {
  ListOrganizationVerticalsInput,
  ListOrganizationVerticalsOutput,
  OrganizationVerticalSummary,
} from '../dtos/list-organization-verticals.dto';
import { OrganizationRepository } from '../../domain/repositories/organization.repository';
import { OrganizationVerticalRepository } from '../../domain/repositories/organization-vertical.repository';
import { VerticalCatalogPort } from '../ports/vertical-catalog.port';
import { OrganizationNotFoundError } from '../../domain/errors/organization.errors';

export class ListOrganizationVerticalsService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly organizationVerticalRepository: OrganizationVerticalRepository,
    private readonly verticalCatalog: VerticalCatalogPort
  ) {}

  async execute(
    input: ListOrganizationVerticalsInput
  ): Promise<ListOrganizationVerticalsOutput> {
    const organization = await this.organizationRepository.findById(input.organizationId);
    if (!organization) {
      throw new OrganizationNotFoundError(input.organizationId);
    }

    const links = await this.organizationVerticalRepository.listByOrganizationId(
      input.organizationId
    );
    const catalogList = await this.verticalCatalog.listAllActive();
    const catalogByCode = new Map(catalogList.map((v) => [v.code, v]));

    const items: OrganizationVerticalSummary[] = links
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
      .filter((item): item is OrganizationVerticalSummary => item !== null);

    return {
      organizationId: input.organizationId,
      items,
    };
  }
}
