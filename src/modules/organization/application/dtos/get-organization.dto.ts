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

export interface GetOrganizationOutput {
  id: string;
  tradeName: string;
  legalName: string | null;
  documentType: string;
  documentNumber: string;
  verticalIds: string[];
  ownerUserId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;
  businessUnits?: BusinessUnitSummary[];
  users?: OrganizationUserSummary[];
}
