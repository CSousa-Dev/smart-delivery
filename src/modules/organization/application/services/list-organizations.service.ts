import { ListOrganizationsInput, ListOrganizationsOutput } from '../dtos/list-organizations.dto';
import { OrganizationRepository } from '../../domain/repositories/organization.repository';
import { OrganizationVerticalRepository } from '../../domain/repositories/organization-vertical.repository';
import { VerticalRepository } from '../../domain/repositories/vertical.repository';

export class ListOrganizationsService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly organizationVerticalRepository: OrganizationVerticalRepository,
    private readonly verticalRepository: VerticalRepository
  ) {}

  async execute(input: ListOrganizationsInput): Promise<ListOrganizationsOutput> {
    const page = input.page && input.page > 0 ? input.page : 1;
    const pageSize =
      input.pageSize && input.pageSize >= 1 && input.pageSize <= 100 ? input.pageSize : 20;
    const sortDirection =
      input.sortDirection === 'asc' || input.sortDirection === 'desc'
        ? input.sortDirection
        : 'desc';

    const organizations = await this.organizationRepository.list(page, pageSize, sortDirection);
    const totalItems = await this.organizationRepository.countAll();
    const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / pageSize);

    const organizationIds = organizations.map((org) => org.getId().value);
    const verticalLinks = await this.organizationVerticalRepository.listByOrganizationIds(
      organizationIds
    );
    const allVerticalIds = Array.from(new Set(verticalLinks.map((link) => link.getVerticalId())));
    const verticals = await this.verticalRepository.listByIds(allVerticalIds);
    const verticalsById = new Map(verticals.map((vertical) => [vertical.getId(), vertical]));
    const verticalsByOrg = new Map<
      string,
      Array<{ id: string; name: string; code: string; description: string }>
    >();
    for (const link of verticalLinks) {
      const vertical = verticalsById.get(link.getVerticalId());
      if (!vertical) {
        continue;
      }
      const list = verticalsByOrg.get(link.getOrganizationId()) ?? [];
      list.push({
        id: vertical.getId(),
        name: vertical.getName(),
        code: vertical.getCode(),
        description: vertical.getDescription(),
      });
      verticalsByOrg.set(link.getOrganizationId(), list);
    }

    return {
      items: organizations.map((org) => ({
        id: org.getId().value,
        tradeName: org.getTradeName(),
        documentType: org.getDocumentType(),
        documentNumber: org.getDocumentNumber(),
        verticals: verticalsByOrg.get(org.getId().value) ?? [],
        status: org.getStatus(),
        createdAt: org.getCreatedAt(),
      })),
      page,
      pageSize,
      totalItems,
      totalPages,
    };
  }
}
