import { Request, Response, NextFunction } from 'express';
import { RegisterStockExitService } from '../../../application/services/register-stock-exit.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  INVENTORY_ITEM_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  INVALID_QUANTITY: (message, code) => AppError.badRequest(message, code),
  FRACTION_NOT_ALLOWED: (message, code) => AppError.badRequest(message, code),
  INVALID_MOVEMENT_SOURCE: (message, code) => AppError.badRequest(message, code),
  MISSING_EXTERNAL_ID: (message, code) => AppError.badRequest(message, code),
  ALLOCATION_SUM_MISMATCH: (message, code) => AppError.badRequest(message, code),
  LOT_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  LOT_ITEM_MISMATCH: (message, code) => AppError.badRequest(message, code),
  LOT_EXPIRED: (message, code) => AppError.badRequest(message, code),
  LOT_INSUFFICIENT_BALANCE: (message, code) => AppError.conflict(message, code),
  INSUFFICIENT_STOCK: (message, code) => AppError.conflict(message, code),
  NO_VALID_LOTS: (message, code) => AppError.conflict(message, code),
};

export class StockExitController {
  constructor(private readonly registerStockExitService: RegisterStockExitService) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.registerStockExitService.execute(req.body);
      res.status(201).json({
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
