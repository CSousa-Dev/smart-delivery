import { VerticalLinkStatusValue } from '../../domain/entities/vertical-link-status';

export interface ListBusinessUnitVerticalsInput {
  businessUnitId: string;
}
export interface BusinessUnitVerticalSummary {
  code: string;
  name: string;
  description: string;
  status: VerticalLinkStatusValue;
}

export interface ListBusinessUnitVerticalsOutput {
  businessUnitId: string;
  organizationId: string;
  items: BusinessUnitVerticalSummary[];
}
