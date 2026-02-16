import { OrganizationStatusValue } from '../../domain/entities/organization.entity';

export interface UpdateOrganizationInput {
  organizationId: string;
  tradeName?: string;
  legalName?: string | null;
}

export interface UpdateOrganizationOutput {
  id: string;
  tradeName: string;
  legalName: string | null;
  documentType: string;
  documentNumber: string;
  ownerUserId: string | null;
  verticalCodes: string[];
  status: OrganizationStatusValue;
  createdAt: Date;
  updatedAt: Date | null;
}
