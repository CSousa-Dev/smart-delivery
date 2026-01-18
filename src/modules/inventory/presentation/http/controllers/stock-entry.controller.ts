import { Request, Response, NextFunction } from 'express';
import { RegisterStockEntryService } from '../../../application/services/register-stock-entry.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  INVENTORY_ITEM_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  LOT_ITEM_CONFLICT: (message, code) => AppError.conflict(message, code),
  LOT_EXPIRATION_MISMATCH: (message, code) => AppError.conflict(message, code),
  INVALID_QUANTITY: (message, code) => AppError.badRequest(message, code),
  FRACTION_NOT_ALLOWED: (message, code) => AppError.badRequest(message, code),
  MISSING_EXPIRATION: (message, code) => AppError.badRequest(message, code),
  INVALID_MOVEMENT_SOURCE: (message, code) => AppError.badRequest(message, code),
  MISSING_EXTERNAL_ID: (message, code) => AppError.badRequest(message, code),
};

export class StockEntryController {
  constructor(private readonly registerStockEntryService: RegisterStockEntryService) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.registerStockEntryService.execute(req.body);
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
