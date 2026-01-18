import {
  ListStockMovementsInput,
  ListStockMovementsOutput,
} from '../dtos/list-stock-movements.dto';
import { StockMovementRepository } from '../../domain/repositories/stock-movement.repository';
import { StockMovementSource, StockMovementType } from '../../domain/entities/stock-movement.entity';
import {
  InvalidDateRangeError,
  InvalidMovementSourceError,
  InvalidMovementTypeError,
  InvalidPaginationError,
} from '../../domain/errors/stock-movement-list.errors';

export class ListStockMovementsService {
  constructor(private readonly stockMovementRepository: StockMovementRepository) {}

  async execute(input: ListStockMovementsInput): Promise<ListStockMovementsOutput> {
    const page = input.page ?? 1;
    const pageSize = input.pageSize ?? 50;

    if (page < 1 || pageSize < 1 || pageSize > 200) {
      throw new InvalidPaginationError(page, pageSize);
    }

    if (input.occurredAtStart && input.occurredAtEnd) {
      if (input.occurredAtStart.getTime() > input.occurredAtEnd.getTime()) {
        throw new InvalidDateRangeError(input.occurredAtStart, input.occurredAtEnd);
      }
    }

    if (input.movementType && !Object.values(StockMovementType).includes(input.movementType as StockMovementType)) {
      throw new InvalidMovementTypeError(input.movementType);
    }

    if (input.movementSource && !Object.values(StockMovementSource).includes(input.movementSource as StockMovementSource)) {
      throw new InvalidMovementSourceError(input.movementSource);
    }

    const params: {
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
    } = {
      businessUnitId: input.businessUnitId,
      page,
      pageSize,
    };

    if (input.itemId !== undefined) params.itemId = input.itemId;
    if (input.lotNumber !== undefined) params.lotNumber = input.lotNumber;
    if (input.movementType !== undefined) params.movementType = input.movementType;
    if (input.movementSource !== undefined) params.movementSource = input.movementSource;
    if (input.externalId !== undefined) params.externalId = input.externalId;
    if (input.occurredAtStart !== undefined) params.occurredAtStart = input.occurredAtStart;
    if (input.occurredAtEnd !== undefined) params.occurredAtEnd = input.occurredAtEnd;

    const { records, total } = await this.stockMovementRepository.listByFilters(params);

    return {
      records: records.map((record) => ({
        id: record.id,
        itemId: record.itemId,
        lotNumber: record.lotNumber,
        type: record.type,
        quantity: record.quantity,
        movementSource: record.movementSource,
        externalId: record.externalId,
        occurredAt: record.occurredAt,
        createdBy: record.createdBy,
      })),
      page,
      pageSize,
      total,
    };
  }
}
