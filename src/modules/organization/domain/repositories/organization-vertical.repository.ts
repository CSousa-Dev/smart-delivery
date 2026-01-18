import { OrganizationVerticalLink } from '../entities/organization-vertical-link.entity';
import { VerticalLinkStatusValue } from '../entities/vertical-link-status';

export interface OrganizationVerticalRepository {
  saveMany(links: OrganizationVerticalLink[]): Promise<void>;
  save(link: OrganizationVerticalLink): Promise<void>;
  listByOrganizationId(organizationId: string): Promise<OrganizationVerticalLink[]>;
  listByOrganizationIds(organizationIds: string[]): Promise<OrganizationVerticalLink[]>;
  listActiveByOrganizationId(organizationId: string): Promise<OrganizationVerticalLink[]>;
  findByOrganizationAndVerticalId(
    organizationId: string,
    verticalId: string
  ): Promise<OrganizationVerticalLink | null>;
  findActiveByOrganizationAndVerticalId(
    organizationId: string,
    verticalId: string
  ): Promise<OrganizationVerticalLink | null>;
  existsActiveByOrganizationAndVerticalId(
    organizationId: string,
    verticalId: string
  ): Promise<boolean>;
  updateStatus(
    organizationId: string,
    verticalId: string,
    status: VerticalLinkStatusValue
  ): Promise<void>;
  countActiveByOrganizationId(organizationId: string): Promise<number>;
}
