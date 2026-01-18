export interface RegisterStockEntryInput {
  businessUnitId: string;
  itemId: string;
  lotNumber: string;
  quantity: number;
  movementSource: string;
  occurredAt: Date;
  createdBy: string;
  expiresAt?: Date | null;
  externalId?: string | null;
}

export interface RegisterStockEntryOutput {
  lotId: string;
  itemId: string;
  lotNumber: string;
  quantity: number;
  movementId: string;
  movementSource: string;
  occurredAt: Date;
}
