import { Request, Response, NextFunction } from 'express';
import { CreateBusinessUnitService } from '../../../application/services/create-business-unit.service';
import { GetBusinessUnitService } from '../../../application/services/get-business-unit.service';
import { ListBusinessUnitsService } from '../../../application/services/list-business-units.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  ORGANIZATION_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  USER_NOT_OWNER: (message, code) => AppError.forbidden(message, code),
  INVALID_PHONE_NUMBER: (message, code) => AppError.badRequest(message, code),
  INVALID_EMAIL: (message, code) => AppError.badRequest(message, code),
  INVALID_POSTAL_CODE: (message, code) => AppError.badRequest(message, code),
  INVALID_STATE: (message, code) => AppError.badRequest(message, code),
  INVALID_COUNTRY: (message, code) => AppError.badRequest(message, code),
  INVALID_BUSINESS_UNIT_ID: (message, code) => AppError.badRequest(message, code),
  BUSINESS_UNIT_NOT_FOUND: (message, code) => AppError.notFound(message, code),
};

export class BusinessUnitController {
  constructor(
    private readonly createBusinessUnitService: CreateBusinessUnitService,
    private readonly getBusinessUnitService: GetBusinessUnitService,
    private readonly listBusinessUnitsService: ListBusinessUnitsService
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.createBusinessUnitService.execute(req.body);
      res.status(201).json({
        success: true,
        data: output,
      });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const actorUserId = String(req.headers['x-actor-user-id'] || '');
      const businessUnitId = String(req.params.id || '');
      const output = await this.getBusinessUnitService.execute({
        businessUnitId,
        actorUserId,
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

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const input: { page?: number; pageSize?: number; sortDirection?: string } = {};
      if (req.query.page) {
        input.page = Number(req.query.page);
      }
      if (req.query.pageSize) {
        input.pageSize = Number(req.query.pageSize);
      }
      if (req.query.sortDirection) {
        input.sortDirection = String(req.query.sortDirection);
      }
      const output = await this.listBusinessUnitsService.execute(input);
      res.status(200).json({
        success: true,
        data: output,
      });
    } catch (error) {
      next(this.mapError(error));
    }
  }
}
