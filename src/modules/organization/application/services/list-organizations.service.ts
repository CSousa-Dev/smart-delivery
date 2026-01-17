import { ListOrganizationsInput, ListOrganizationsOutput } from '../dtos/list-organizations.dto';
import { OrganizationRepository } from '../../domain/repositories/organization.repository';
import { OrganizationVerticalRepository } from '../../domain/repositories/organization-vertical.repository';

export class ListOrganizationsService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly organizationVerticalRepository: OrganizationVerticalRepository
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
    const verticalsByOrg = new Map<string, string[]>();
    for (const link of verticalLinks) {
      const list = verticalsByOrg.get(link.getOrganizationId()) ?? [];
      list.push(link.getVerticalId());
      verticalsByOrg.set(link.getOrganizationId(), list);
    }

    return {
      items: organizations.map((org) => ({
        id: org.getId().value,
        tradeName: org.getTradeName(),
        documentType: org.getDocumentType(),
        documentNumber: org.getDocumentNumber(),
        verticalIds: verticalsByOrg.get(org.getId().value) ?? [],
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
