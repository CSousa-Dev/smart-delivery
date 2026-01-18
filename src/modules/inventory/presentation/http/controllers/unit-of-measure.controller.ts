import { Request, Response, NextFunction } from 'express';
import { CreateUnitOfMeasureService } from '../../../application/services/create-unit-of-measure.service';
import { UpdateUnitOfMeasureService } from '../../../application/services/update-unit-of-measure.service';
import { AppError } from '../../../../../shared/utils/AppError';
import {
  ImmutableFieldUpdateError,
  NoUpdatableFieldsError,
} from '../../../domain/errors/unit-of-measure.errors';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  ORGANIZATION_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  UNIT_CODE_ALREADY_EXISTS: (message, code) => AppError.conflict(message, code),
  UNIT_NAME_ALREADY_EXISTS: (message, code) => AppError.conflict(message, code),
  INVALID_UNIT_CODE: (message, code) => AppError.badRequest(message, code),
  INVALID_UNIT_NAME: (message, code) => AppError.badRequest(message, code),
  INVALID_UNIT_SYMBOL: (message, code) => AppError.badRequest(message, code),
  UNIT_OF_MEASURE_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  INVALID_UNIT_STATUS: (message, code) => AppError.badRequest(message, code),
  NO_UPDATABLE_FIELDS: (message, code) => AppError.badRequest(message, code),
  IMMUTABLE_FIELD_UPDATE: (message, code) => AppError.badRequest(message, code),
};

export class UnitOfMeasureController {
  constructor(
    private readonly createUnitOfMeasureService: CreateUnitOfMeasureService,
    private readonly updateUnitOfMeasureService: UpdateUnitOfMeasureService
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.createUnitOfMeasureService.execute(req.body);
      res.status(201).json({
        success: true,
        data: output,
      });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { code, symbol, allowsFraction } = req.body ?? {};
      if (code !== undefined) {
        throw new ImmutableFieldUpdateError('code');
      }
      if (symbol !== undefined) {
        throw new ImmutableFieldUpdateError('symbol');
      }
      if (allowsFraction !== undefined) {
        throw new ImmutableFieldUpdateError('allowsFraction');
      }

      const { name, status, updatedBy } = req.body ?? {};
      if (name === undefined && status === undefined) {
        throw new NoUpdatableFieldsError();
      }

      const output = await this.updateUnitOfMeasureService.execute({
        unitOfMeasureId: String(req.params.id),
        name,
        status,
        updatedBy,
      });

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
