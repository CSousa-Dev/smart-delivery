export interface ListBusinessUnitsInput {
  page?: number;
  pageSize?: number;
  sortDirection?: string;
}

export interface BusinessUnitListItem {
  id: string;
  organizationId: string;
  publicName: string;
  phoneNumber: string;
  phoneHasWhatsapp: boolean;
  status: string;
  createdAt: Date;
}

export interface ListBusinessUnitsOutput {
  items: BusinessUnitListItem[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
