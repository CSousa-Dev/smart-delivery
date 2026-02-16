export interface GetOrganizationInput {
  organizationId: string;
  include?: string;
}

export interface BusinessUnitSummary {
  id: string;
  organizationId: string;
  publicName: string;
  phoneNumber: string;
  phoneHasWhatsapp: boolean;
  status: string;
}

export interface OrganizationUserSummary {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: string;
}

export interface VerticalSummary {
  code: string;
  name: string;
  description: string;
}

export interface GetOrganizationOutput {
  id: string;
  tradeName: string;
  legalName: string | null;
  documentType: string;
  documentNumber: string;
  verticals: VerticalSummary[];
  ownerUserId: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;
  businessUnits?: BusinessUnitSummary[];
  users?: OrganizationUserSummary[];
}
