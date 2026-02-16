import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../../../../shared/utils/AppError';
import { LinkBusinessUnitVerticalService } from '../../../application/services/link-business-unit-vertical.service';
import { UnlinkBusinessUnitVerticalService } from '../../../application/services/unlink-business-unit-vertical.service';
import { ListBusinessUnitVerticalsService } from '../../../application/services/list-business-unit-verticals.service';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  BUSINESS_UNIT_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  ORGANIZATION_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  ORGANIZATION_HAS_NO_OWNER: (message, code) => AppError.badRequest(message, code),
  USER_NOT_OWNER: (message, code) => AppError.forbidden(message, code),
  VERTICAL_NOT_IN_ORGANIZATION: (message, code) => AppError.badRequest(message, code),
  BUSINESS_UNIT_VERTICAL_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  BUSINESS_UNIT_REQUIRES_ACTIVE_VERTICAL: (message, code) => AppError.badRequest(message, code),
};

export class BusinessUnitVerticalController {
  constructor(
    private readonly linkBusinessUnitVerticalService: LinkBusinessUnitVerticalService,
    private readonly unlinkBusinessUnitVerticalService: UnlinkBusinessUnitVerticalService,
    private readonly listBusinessUnitVerticalsService: ListBusinessUnitVerticalsService
  ) {}

  async link(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const businessUnitId = String(req.params.businessUnitId || '');
      const { verticalCode, actorUserId } = req.body as {
        verticalCode?: string;
        actorUserId?: string;
      };
      const output = await this.linkBusinessUnitVerticalService.execute({
        businessUnitId,
        verticalCode: String(verticalCode || ''),
        actorUserId: String(actorUserId || ''),
      });
      res.status(200).json({ success: true, data: output });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async unlink(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const businessUnitId = String(req.params.businessUnitId || '');
      const verticalCode = String(req.params.verticalCode || '');
      const actorUserId = String(req.headers['x-actor-user-id'] || '');
      const output = await this.unlinkBusinessUnitVerticalService.execute({
        businessUnitId,
        verticalCode,
        actorUserId,
      });
      res.status(200).json({ success: true, data: output });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const businessUnitId = String(req.params.businessUnitId || '');
      const output = await this.listBusinessUnitVerticalsService.execute({ businessUnitId });
      res.status(200).json({ success: true, data: output });
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
