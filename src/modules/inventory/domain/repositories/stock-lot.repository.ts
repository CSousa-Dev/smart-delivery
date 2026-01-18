import { StockLot } from '../entities/stock-lot.entity';

export interface StockLotRepository {
  findByLotNumber(
    businessUnitId: string,
    lotNumber: string
  ): Promise<StockLot | null>;
  findByLotNumbers(
    businessUnitId: string,
    lotNumbers: string[]
  ): Promise<StockLot[]>;
  listAvailableLots(
    businessUnitId: string,
    itemId: string
  ): Promise<StockLot[]>;
  listByItemId(
    businessUnitId: string,
    itemId: string,
    includeZeroBalance: boolean
  ): Promise<StockLot[]>;
  save(lot: StockLot): Promise<void>;
  incrementQuantity(lotId: string, quantity: number): Promise<void>;
  decrementLots(allocations: Array<{ lotId: string; quantity: number }>): Promise<void>;
}
