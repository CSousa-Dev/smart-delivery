import { Request, Response, NextFunction } from 'express';
import { GetStockPositionService } from '../../../application/services/get-stock-position.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  INVALID_STOCK_POSITION_QUERY: (message, code) => AppError.badRequest(message, code),
  INVENTORY_ITEM_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  LOT_NOT_FOUND: (message, code) => AppError.notFound(message, code),
};

export class StockPositionController {
  constructor(private readonly getStockPositionService: GetStockPositionService) {}

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params: { businessUnitId: string; itemId?: string; lotNumber?: string; includeZeroBalance?: boolean } = {
        businessUnitId: String(req.query.businessUnitId ?? ''),
      };
      if (req.query.itemId !== undefined) {
        params.itemId = String(req.query.itemId);
      }
      if (req.query.lotNumber !== undefined) {
        params.lotNumber = String(req.query.lotNumber);
      }
      if (req.query.includeZeroBalance !== undefined) {
        params.includeZeroBalance = String(req.query.includeZeroBalance) === 'true';
      }

      const output = await this.getStockPositionService.execute(params);

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
