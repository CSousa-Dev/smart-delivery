import { Request, Response, NextFunction } from 'express';
import { CreateVerticalService } from '../../../application/services/create-vertical.service';
import { UpdateVerticalService } from '../../../application/services/update-vertical.service';
import { InactivateVerticalService } from '../../../application/services/inactivate-vertical.service';
import { ActivateVerticalService } from '../../../application/services/activate-vertical.service';
import { GetVerticalService } from '../../../application/services/get-vertical.service';
import { ListVerticalsService } from '../../../application/services/list-verticals.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  VERTICAL_CODE_ALREADY_EXISTS: (message, code) => AppError.conflict(message, code),
  VERTICAL_NAME_ALREADY_EXISTS: (message, code) => AppError.conflict(message, code),
  INVALID_VERTICAL_CODE: (message, code) => AppError.badRequest(message, code),
  INVALID_VERTICAL_NAME: (message, code) => AppError.badRequest(message, code),
  INVALID_VERTICAL_DESCRIPTION: (message, code) => AppError.badRequest(message, code),
  VERTICAL_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  VERTICAL_ALREADY_INACTIVE: (message, code) => AppError.conflict(message, code),
  VERTICAL_ALREADY_ACTIVE: (message, code) => AppError.conflict(message, code),
};

export class VerticalController {
  constructor(
    private readonly createVerticalService: CreateVerticalService,
    private readonly updateVerticalService: UpdateVerticalService,
    private readonly inactivateVerticalService: InactivateVerticalService,
    private readonly activateVerticalService: ActivateVerticalService,
    private readonly getVerticalService: GetVerticalService,
    private readonly listVerticalsService: ListVerticalsService
  ) {}

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

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.updateVerticalService.execute(req.body);
      res.status(200).json({
        success: true,
        data: output,
      });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async inactivate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.inactivateVerticalService.execute(req.body);
      res.sendStatus(204);
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async activate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.activateVerticalService.execute(req.body);
      res.sendStatus(204);
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.getVerticalService.execute(req.body);
      res.status(200).json({
        success: true,
        data: output,
      });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.listVerticalsService.execute();
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
