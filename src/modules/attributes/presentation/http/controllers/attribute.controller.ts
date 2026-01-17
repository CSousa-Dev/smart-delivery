import { Request, Response, NextFunction } from 'express';
import { CreateAttributeService } from '../../../application/services/create-attribute.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  ATTRIBUTE_CODE_ALREADY_EXISTS: (message, code) => AppError.conflict(message, code),
  ATTRIBUTE_NAME_ALREADY_EXISTS: (message, code) => AppError.conflict(message, code),
  INVALID_ATTRIBUTE_CODE: (message, code) => AppError.badRequest(message, code),
  INVALID_ATTRIBUTE_TYPE: (message, code) => AppError.badRequest(message, code),
  INVALID_ATTRIBUTE_LIMITS: (message, code) => AppError.badRequest(message, code),
  INVALID_DEFAULT_VALUE: (message, code) => AppError.badRequest(message, code),
  DEFAULT_VALUE_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  INVALID_ALLOWED_VALUE_NAME: (message, code) => AppError.badRequest(message, code),
  INVALID_ALLOWED_VALUE_VALUE: (message, code) => AppError.badRequest(message, code),
  ALLOWED_VALUE_OUT_OF_BOUNDS: (message, code) => AppError.badRequest(message, code),
  ALLOWED_VALUE_NAME_EXISTS: (message, code) => AppError.conflict(message, code),
  ALLOWED_VALUE_VALUE_EXISTS: (message, code) => AppError.conflict(message, code),
};

export class AttributeController {
  constructor(private readonly createAttributeService: CreateAttributeService) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.createAttributeService.execute(req.body);
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
