import { Request, Response, NextFunction } from 'express';
import { CreateAllowedValueService } from '../../../application/services/create-allowed-value.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  ATTRIBUTE_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  ATTRIBUTE_NOT_OPTION: (message, code) => AppError.badRequest(message, code),
  ALLOWED_VALUE_NAME_EXISTS: (message, code) => AppError.conflict(message, code),
  ALLOWED_VALUE_VALUE_EXISTS: (message, code) => AppError.conflict(message, code),
  INVALID_ALLOWED_VALUE_VALUE: (message, code) => AppError.badRequest(message, code),
  INVALID_ALLOWED_VALUE_NAME: (message, code) => AppError.badRequest(message, code),
  ALLOWED_VALUE_OUT_OF_BOUNDS: (message, code) => AppError.badRequest(message, code),
};

export class AllowedValueController {
  constructor(private readonly createAllowedValueService: CreateAllowedValueService) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.createAllowedValueService.execute({
        ...req.body,
        attributeId: req.params.attributeId,
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
