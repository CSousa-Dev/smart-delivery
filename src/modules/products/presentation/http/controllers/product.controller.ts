import { Request, Response, NextFunction } from 'express';
import { CreateProductService } from '../../../application/services/create-product.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  BUSINESS_UNIT_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  CATEGORY_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  BUSINESS_UNIT_ORGANIZATION_MISMATCH: (message, code) => AppError.badRequest(message, code),
  CATEGORY_VERTICAL_NOT_ENABLED: (message, code) => AppError.badRequest(message, code),
  USER_NOT_OWNER: (message, code) => AppError.forbidden(message, code),
  PRODUCT_CODE_ALREADY_EXISTS: (message, code) => AppError.conflict(message, code),
  PRODUCT_TITLE_ALREADY_EXISTS: (message, code) => AppError.conflict(message, code),
  INVALID_PRODUCT_CODE: (message, code) => AppError.badRequest(message, code),
  INVALID_PRODUCT_TITLE: (message, code) => AppError.badRequest(message, code),
  INVALID_PRODUCT_SHORT_DESCRIPTION: (message, code) => AppError.badRequest(message, code),
  INVALID_PRODUCT_DESCRIPTION: (message, code) => AppError.badRequest(message, code),
  INVALID_PRODUCT_IMAGES: (message, code) => AppError.badRequest(message, code),
  INVALID_PRODUCT_ATTRIBUTES: (message, code) => AppError.badRequest(message, code),
  MISSING_REQUIRED_ATTRIBUTES: (message, code) => AppError.badRequest(message, code),
};

export class ProductController {
  constructor(private readonly createProductService: CreateProductService) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.createProductService.execute(req.body);
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
