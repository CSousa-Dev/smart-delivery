import { ListOrganizationsInput, ListOrganizationsOutput } from '../dtos/list-organizations.dto';
import { OrganizationRepository } from '../../domain/repositories/organization.repository';
import { OrganizationVerticalRepository } from '../../domain/repositories/organization-vertical.repository';
import { VerticalCatalogPort } from '../ports/vertical-catalog.port';

export class ListOrganizationsService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly organizationVerticalRepository: OrganizationVerticalRepository,
    private readonly verticalCatalog: VerticalCatalogPort
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
    const catalogList = await this.verticalCatalog.listAllActive();
    const catalogByCode = new Map(catalogList.map((v) => [v.code, v]));
    const verticalsByOrg = new Map<string, Array<{ code: string; name: string; description: string }>>();
    for (const link of verticalLinks) {
      const catalog = catalogByCode.get(link.getVerticalCode());
      if (!catalog) continue;
      const list = verticalsByOrg.get(link.getOrganizationId()) ?? [];
      list.push({ code: link.getVerticalCode(), name: catalog.name, description: catalog.description });
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
