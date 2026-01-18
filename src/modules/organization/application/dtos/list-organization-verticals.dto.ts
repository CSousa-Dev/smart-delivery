import { VerticalLinkStatusValue } from '../../domain/entities/vertical-link-status';

export interface ListOrganizationVerticalsInput {
  organizationId: string;
}

export interface OrganizationVerticalSummary {
  id: string;
  name: string;
  code: string;
  description: string;
  status: VerticalLinkStatusValue;
}

export interface ListOrganizationVerticalsOutput {
  organizationId: string;
  items: OrganizationVerticalSummary[];
}
