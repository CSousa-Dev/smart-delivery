export interface ListOrganizationsInput {
  page?: number;
  pageSize?: number;
  sortDirection?: string;
}

export interface OrganizationListItem {
  id: string;
  tradeName: string;
  documentType: string;
  documentNumber: string;
  verticalIds: string[];
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
