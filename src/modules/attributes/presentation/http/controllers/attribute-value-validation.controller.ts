import { Request, Response, NextFunction } from 'express';
import { ValidateAttributeValuesService } from '../../../application/services/validate-attribute-values.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  VERTICAL_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  INVALID_CATEGORY_CHAIN: (message, code) => AppError.badRequest(message, code),
  VERTICAL_REQUIRED: (message, code) => AppError.badRequest(message, code),
  INVALID_VALIDATION_PAYLOAD: (message, code) => AppError.badRequest(message, code),
};

export class AttributeValueValidationController {
  constructor(private readonly validateAttributeValuesService: ValidateAttributeValuesService) {}

  async validate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.validateAttributeValuesService.execute(req.body);
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
