import { OrganizationVerticalLink } from '../entities/organization-vertical-link.entity';
import { VerticalLinkStatusValue } from '../entities/vertical-link-status';

export interface OrganizationVerticalRepository {
  saveMany(links: OrganizationVerticalLink[]): Promise<void>;
  save(link: OrganizationVerticalLink): Promise<void>;
  listByOrganizationId(organizationId: string): Promise<OrganizationVerticalLink[]>;
  listByOrganizationIds(organizationIds: string[]): Promise<OrganizationVerticalLink[]>;
  listActiveByOrganizationId(organizationId: string): Promise<OrganizationVerticalLink[]>;
  findByOrganizationAndVerticalCode(
    organizationId: string,
    verticalCode: string
  ): Promise<OrganizationVerticalLink | null>;
  findActiveByOrganizationAndVerticalCode(
    organizationId: string,
    verticalCode: string
  ): Promise<OrganizationVerticalLink | null>;
  existsActiveByOrganizationAndVerticalCode(
    organizationId: string,
    verticalCode: string
  ): Promise<boolean>;
  updateStatus(
    organizationId: string,
    verticalCode: string,
    status: VerticalLinkStatusValue
  ): Promise<void>;
  countActiveByOrganizationId(organizationId: string): Promise<number>;
}
