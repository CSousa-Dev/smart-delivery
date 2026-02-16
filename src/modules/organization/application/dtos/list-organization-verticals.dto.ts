import { VerticalLinkStatusValue } from '../../domain/entities/vertical-link-status';

export interface ListOrganizationVerticalsInput {
  organizationId: string;
}

export interface OrganizationVerticalSummary {
  code: string;
  name: string;
  description: string;
  status: VerticalLinkStatusValue;
}

export interface ListOrganizationVerticalsOutput {
  organizationId: string;
  items: OrganizationVerticalSummary[];
}
