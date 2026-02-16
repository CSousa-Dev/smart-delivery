import { OrganizationStatusValue } from '../../domain/entities/organization.entity';

export interface CreateOrganizationInput {
  tradeName: string;
  legalName?: string | null;
  documentType: string;
  documentNumber: string;
  ownerUserId?: string | null;
}

export interface CreateOrganizationOutput {
  id: string;
  tradeName: string;
  legalName: string | null;
  documentType: string;
  documentNumber: string;
  ownerUserId: string | null;
  status: OrganizationStatusValue;
  createdAt: Date;
}
