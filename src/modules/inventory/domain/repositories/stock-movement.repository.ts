import { StockMovement } from '../entities/stock-movement.entity';
import { StockMovementRecord } from '../entities/stock-movement-record.entity';

export interface StockMovementRepository {
  save(movement: StockMovement): Promise<void>;
  saveAll(movements: StockMovement[]): Promise<void>;
  listByFilters(params: {
    businessUnitId: string;
    itemId?: string;
    lotNumber?: string;
    movementType?: string;
    movementSource?: string;
    externalId?: string;
    occurredAtStart?: Date;
    occurredAtEnd?: Date;
    page: number;
    pageSize: number;
  }): Promise<{ records: StockMovementRecord[]; total: number }>;
}
