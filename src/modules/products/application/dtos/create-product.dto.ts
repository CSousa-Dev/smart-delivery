export interface CreateProductInput {
  organizationId: string;
  businessUnitId: string;
  categoryId: string;
  code: string;
  title: string;
  shortDescription: string;
  description: string;
  images: Array<{
    url: string;
    order: number;
    altText?: string | null;
    isPrimary: boolean;
  }>;
  attributes: Array<{
    attributeId: string;
    value: string;
  }>;
  createdBy: string;
}

export interface CreateProductOutput {
  id: string;
  organizationId: string;
  businessUnitId: string;
  categoryId: string;
  code: string;
  title: string;
  shortDescription: string;
  description: string;
  images: Array<{
    url: string;
    order: number;
    altText: string | null;
    isPrimary: boolean;
  }>;
  attributes: Array<{
    attributeId: string;
    value: string;
  }>;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date | null;
}
