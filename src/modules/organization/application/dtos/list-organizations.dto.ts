export interface ListOrganizationsInput {
  page?: number;
  pageSize?: number;
  sortDirection?: string;
}

export interface VerticalSummary {
  id: string;
  name: string;
  code: string;
  description: string;
}

export interface OrganizationListItem {
  id: string;
  tradeName: string;
  documentType: string;
  documentNumber: string;
  verticals: VerticalSummary[];
  status: string;
  createdAt: Date;
}

export interface ListOrganizationsOutput {
  items: OrganizationListItem[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
