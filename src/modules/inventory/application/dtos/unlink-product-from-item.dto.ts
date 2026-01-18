export interface UnlinkProductFromItemInput {
  productId: string;
  itemId: string;
  businessUnitId: string;
  updatedBy: string;
}

export interface UnlinkProductFromItemOutput {
  id: string;
  businessUnitId: string;
  productId: string;
  itemId: string;
  status: string;
  updatedBy: string | null;
  updatedAt: Date | null;
}
