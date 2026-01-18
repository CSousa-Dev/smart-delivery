import { Request, Response, NextFunction } from 'express';
import { ListStockMovementsService } from '../../../application/services/list-stock-movements.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  INVALID_DATE_RANGE: (message, code) => AppError.badRequest(message, code),
  INVALID_MOVEMENT_TYPE: (message, code) => AppError.badRequest(message, code),
  INVALID_MOVEMENT_SOURCE: (message, code) => AppError.badRequest(message, code),
  INVALID_PAGINATION: (message, code) => AppError.badRequest(message, code),
};

export class StockMovementController {
  constructor(private readonly listStockMovementsService: ListStockMovementsService) {}

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params: {
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
      } = {
        businessUnitId: String(req.query.businessUnitId ?? ''),
      };

      if (req.query.itemId !== undefined) params.itemId = String(req.query.itemId);
      if (req.query.lotNumber !== undefined) params.lotNumber = String(req.query.lotNumber);
      if (req.query.movementType !== undefined) params.movementType = String(req.query.movementType);
      if (req.query.movementSource !== undefined) params.movementSource = String(req.query.movementSource);
      if (req.query.externalId !== undefined) params.externalId = String(req.query.externalId);
      if (req.query.occurredAtStart !== undefined) {
        params.occurredAtStart = new Date(String(req.query.occurredAtStart));
      }
      if (req.query.occurredAtEnd !== undefined) {
        params.occurredAtEnd = new Date(String(req.query.occurredAtEnd));
      }
      if (req.query.page !== undefined) params.page = Number(req.query.page);
      if (req.query.pageSize !== undefined) params.pageSize = Number(req.query.pageSize);

      const output = await this.listStockMovementsService.execute(params);

      res.status(200).json({
        success: true,
        data: output,
      });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  private mapError(error: unknown): Error {
    if (error && typeof error === 'object' && 'code' in error) {
      const code = String((error as { code: string }).code);
      const message = error instanceof Error ? error.message : 'Request error';
      const mapper = ERROR_STATUS_BY_CODE[code];
      if (mapper) {
        return mapper(message, code);
      }
    }

    return AppError.internal();
  }
}
