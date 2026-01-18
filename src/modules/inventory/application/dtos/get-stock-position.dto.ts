export interface GetStockPositionInput {
  businessUnitId: string;
  itemId?: string;
  lotNumber?: string;
  includeZeroBalance?: boolean;
}

export type GetStockPositionOutput =
  | {
      itemId: string;
      totalAvailable: number;
      lots: Array<{ lotNumber: string; quantityAvailable: number; expiresAt: Date | null }>;
    }
  | {
      itemId: string;
      lotNumber: string;
      quantityAvailable: number;
      expiresAt: Date | null;
    };
