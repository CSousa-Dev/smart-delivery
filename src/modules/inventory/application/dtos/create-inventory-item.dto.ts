export interface CreateInventoryItemInput {
  organizationId: string;
  businessUnitId: string;
  name: string;
  type: string;
  unitOfMeasureId: string;
  requiresExpiration: boolean;
  createdBy: string;
}

export interface CreateInventoryItemOutput {
  id: string;
  organizationId: string;
  businessUnitId: string;
  name: string;
  type: string;
  unitOfMeasureId: string;
  requiresExpiration: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date | null;
}
