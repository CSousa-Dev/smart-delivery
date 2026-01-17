import { Request, Response, NextFunction } from 'express';
import { CreateVerticalService } from '../../../application/services/create-vertical.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  VERTICAL_CODE_ALREADY_EXISTS: (message, code) => AppError.conflict(message, code),
  VERTICAL_NAME_ALREADY_EXISTS: (message, code) => AppError.conflict(message, code),
  INVALID_VERTICAL_CODE: (message, code) => AppError.badRequest(message, code),
  INVALID_VERTICAL_NAME: (message, code) => AppError.badRequest(message, code),
  INVALID_VERTICAL_DESCRIPTION: (message, code) => AppError.badRequest(message, code),
};

export class VerticalController {
  constructor(private readonly createVerticalService: CreateVerticalService) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.createVerticalService.execute(req.body);
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
