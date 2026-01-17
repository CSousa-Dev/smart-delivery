import { Request, Response, NextFunction } from 'express';
import { LinkAttributeToCategoryService } from '../../../application/services/link-attribute-to-category.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  CATEGORY_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  ATTRIBUTE_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  CATEGORY_ATTRIBUTE_EXISTS: (message, code) => AppError.conflict(message, code),
  ATTRIBUTE_NOT_IN_VERTICAL: (message, code) => AppError.badRequest(message, code),
  INVALID_ATTRIBUTE_LIMITS: (message, code) => AppError.badRequest(message, code),
  ATTRIBUTE_NOT_OPTION: (message, code) => AppError.badRequest(message, code),
  INVALID_DEFAULT_VALUE: (message, code) => AppError.badRequest(message, code),
  DEFAULT_VALUE_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  ALLOWED_VALUE_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  ALLOWED_VALUE_CONFLICT: (message, code) => AppError.conflict(message, code),
};

export class CategoryAttributeController {
  constructor(private readonly linkAttributeToCategoryService: LinkAttributeToCategoryService) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.linkAttributeToCategoryService.execute({
        ...req.body,
        categoryId: req.params.categoryId,
      });
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
