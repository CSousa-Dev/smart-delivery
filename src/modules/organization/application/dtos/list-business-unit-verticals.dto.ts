import { VerticalLinkStatusValue } from '../../domain/entities/vertical-link-status';

export interface ListBusinessUnitVerticalsInput {
  businessUnitId: string;
}
export interface BusinessUnitVerticalSummary {
  id: string;
  name: string;
  code: string;
  description: string;
  status: VerticalLinkStatusValue;
}

export interface ListBusinessUnitVerticalsOutput {
  businessUnitId: string;
  organizationId: string;
  items: BusinessUnitVerticalSummary[];
}
