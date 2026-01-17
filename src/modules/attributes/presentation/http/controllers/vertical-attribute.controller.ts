import { Request, Response, NextFunction } from 'express';
import { LinkAttributeToVerticalService } from '../../../application/services/link-attribute-to-vertical.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  VERTICAL_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  ATTRIBUTE_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  VERTICAL_ATTRIBUTE_EXISTS: (message, code) => AppError.conflict(message, code),
  INVALID_ATTRIBUTE_LIMITS: (message, code) => AppError.badRequest(message, code),
  ATTRIBUTE_NOT_OPTION: (message, code) => AppError.badRequest(message, code),
  INVALID_DEFAULT_VALUE: (message, code) => AppError.badRequest(message, code),
  DEFAULT_VALUE_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  ALLOWED_VALUE_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  ALLOWED_VALUE_CONFLICT: (message, code) => AppError.conflict(message, code),
};

export class VerticalAttributeController {
  constructor(private readonly linkAttributeToVerticalService: LinkAttributeToVerticalService) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.linkAttributeToVerticalService.execute({
        ...req.body,
        verticalId: req.params.verticalId,
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
