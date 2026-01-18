import { Request, Response, NextFunction } from 'express';
import { CreateInventoryItemService } from '../../../application/services/create-inventory-item.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  BUSINESS_UNIT_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  BUSINESS_UNIT_ORG_MISMATCH: (message, code) => AppError.badRequest(message, code),
  UNIT_OF_MEASURE_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  UNIT_OF_MEASURE_ORG_MISMATCH: (message, code) => AppError.badRequest(message, code),
  UNIT_OF_MEASURE_INACTIVE: (message, code) => AppError.badRequest(message, code),
  INVENTORY_ITEM_NAME_EXISTS: (message, code) => AppError.conflict(message, code),
  INVALID_INVENTORY_ITEM_TYPE: (message, code) => AppError.badRequest(message, code),
  INVALID_INVENTORY_ITEM_NAME: (message, code) => AppError.badRequest(message, code),
  MISSING_REQUIRED_FIELDS: (message, code) => AppError.badRequest(message, code),
  INVALID_REQUIRES_EXPIRATION: (message, code) => AppError.badRequest(message, code),
};

export class InventoryItemController {
  constructor(private readonly createInventoryItemService: CreateInventoryItemService) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.createInventoryItemService.execute(req.body);
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
