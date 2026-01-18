import {
  ListOrganizationVerticalsInput,
  ListOrganizationVerticalsOutput,
  OrganizationVerticalSummary,
} from '../dtos/list-organization-verticals.dto';
import { OrganizationRepository } from '../../domain/repositories/organization.repository';
import { OrganizationVerticalRepository } from '../../domain/repositories/organization-vertical.repository';
import { VerticalRepository } from '../../domain/repositories/vertical.repository';
import { OrganizationNotFoundError } from '../../domain/errors/organization.errors';

export class ListOrganizationVerticalsService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly organizationVerticalRepository: OrganizationVerticalRepository,
    private readonly verticalRepository: VerticalRepository
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
    const verticalIds = links.map((link) => link.getVerticalId());
    const verticals = await this.verticalRepository.listByIds(verticalIds);
    const verticalsById = new Map(verticals.map((vertical) => [vertical.getId(), vertical]));

    const items: OrganizationVerticalSummary[] = links
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
      .filter((item): item is OrganizationVerticalSummary => item !== null);

    return {
      organizationId: input.organizationId,
      items,
    };
  }
}
