import { Request, Response, NextFunction } from 'express';
import { LinkProductToItemService } from '../../../application/services/link-product-to-item.service';
import { UnlinkProductFromItemService } from '../../../application/services/unlink-product-from-item.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  PRODUCT_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  INVENTORY_ITEM_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  PRODUCT_ITEM_BUSINESS_UNIT_MISMATCH: (message, code) => AppError.badRequest(message, code),
  PRODUCT_ALREADY_LINKED: (message, code) => AppError.conflict(message, code),
  ITEM_ALREADY_LINKED: (message, code) => AppError.conflict(message, code),
  PRODUCT_ITEM_LINK_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  LINK_ALREADY_INACTIVE: (message, code) => AppError.conflict(message, code),
};

export class ProductItemLinkController {
  constructor(
    private readonly linkProductToItemService: LinkProductToItemService,
    private readonly unlinkProductFromItemService: UnlinkProductFromItemService
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.linkProductToItemService.execute(req.body);
      res.status(201).json({
        success: true,
        data: output,
      });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async deactivate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.unlinkProductFromItemService.execute(req.body);
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
