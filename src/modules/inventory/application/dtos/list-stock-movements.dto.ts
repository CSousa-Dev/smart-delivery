export interface ListStockMovementsInput {
  businessUnitId: string;
  itemId?: string;
  lotNumber?: string;
  movementType?: string;
  movementSource?: string;
  externalId?: string;
  occurredAtStart?: Date;
  occurredAtEnd?: Date;
  page?: number;
  pageSize?: number;
}

export interface ListStockMovementsOutput {
  records: Array<{
    id: string;
    itemId: string;
    lotNumber: string;
    type: string;
    quantity: number;
    movementSource: string;
    externalId: string | null;
    occurredAt: Date;
    createdBy: string;
  }>;
  page: number;
  pageSize: number;
  total: number;
}
