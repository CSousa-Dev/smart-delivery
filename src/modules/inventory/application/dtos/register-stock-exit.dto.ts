export interface RegisterStockExitInput {
  businessUnitId: string;
  itemId: string;
  quantity: number;
  movementSource: string;
  occurredAt: Date;
  createdBy: string;
  externalId?: string | null;
  lotAllocations?: Array<{ lotNumber: string; quantity: number }>;
}

export interface RegisterStockExitOutput {
  itemId: string;
  quantity: number;
  movementIds: string[];
  lots: Array<{ lotNumber: string; quantity: number }>;
}
