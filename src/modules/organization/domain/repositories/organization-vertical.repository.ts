import { OrganizationVerticalLink } from '../entities/organization-vertical-link.entity';

export interface OrganizationVerticalRepository {
  saveMany(links: OrganizationVerticalLink[]): Promise<void>;
  listByOrganizationId(organizationId: string): Promise<OrganizationVerticalLink[]>;
  listByOrganizationIds(organizationIds: string[]): Promise<OrganizationVerticalLink[]>;
}
