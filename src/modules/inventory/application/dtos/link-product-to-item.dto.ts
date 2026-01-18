export interface LinkProductToItemInput {
  productId: string;
  itemId: string;
  businessUnitId: string;
  createdBy: string;
}

export interface LinkProductToItemOutput {
  id: string;
  businessUnitId: string;
  productId: string;
  itemId: string;
  status: string;
  createdBy: string;
  createdAt: Date;
  updatedBy: string | null;
  updatedAt: Date | null;
}
