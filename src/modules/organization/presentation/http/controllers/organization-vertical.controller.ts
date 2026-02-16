import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../../../../shared/utils/AppError';
import { LinkOrganizationVerticalService } from '../../../application/services/link-organization-vertical.service';
import { UnlinkOrganizationVerticalService } from '../../../application/services/unlink-organization-vertical.service';
import { ListOrganizationVerticalsService } from '../../../application/services/list-organization-verticals.service';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  ORGANIZATION_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  VERTICAL_NOT_REGISTERED: (message, code) => AppError.badRequest(message, code),
  ORGANIZATION_VERTICAL_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  ORGANIZATION_REQUIRES_ACTIVE_VERTICAL: (message, code) => AppError.badRequest(message, code),
};

export class OrganizationVerticalController {
  constructor(
    private readonly linkOrganizationVerticalService: LinkOrganizationVerticalService,
    private readonly unlinkOrganizationVerticalService: UnlinkOrganizationVerticalService,
    private readonly listOrganizationVerticalsService: ListOrganizationVerticalsService
  ) {}

  async link(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const organizationId = String(req.params.organizationId || '');
      const { verticalCode } = req.body as { verticalCode?: string };
      const output = await this.linkOrganizationVerticalService.execute({
        organizationId,
        verticalCode: String(verticalCode || ''),
      });
      res.status(200).json({ success: true, data: output });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async unlink(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const organizationId = String(req.params.organizationId || '');
      const verticalCode = String(req.params.verticalCode || '');
      const output = await this.unlinkOrganizationVerticalService.execute({
        organizationId,
        verticalCode,
      });
      res.status(200).json({ success: true, data: output });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const organizationId = String(req.params.organizationId || '');
      const output = await this.listOrganizationVerticalsService.execute({ organizationId });
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
