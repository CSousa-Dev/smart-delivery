import { Request, Response, NextFunction } from 'express';
import { CreateOrganizationService } from '../../../application/services/create-organization.service';
import { GetOrganizationService } from '../../../application/services/get-organization.service';
import { ListOrganizationsService } from '../../../application/services/list-organizations.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  OWNER_USER_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  USER_ALREADY_LINKED: (message, code) => AppError.conflict(message, code),
  DOCUMENT_ALREADY_EXISTS: (message, code) => AppError.conflict(message, code),
  INVALID_DOCUMENT: (message, code) => AppError.badRequest(message, code),
  INVALID_DOCUMENT_TYPE: (message, code) => AppError.badRequest(message, code),
  LEGAL_NAME_REQUIRED: (message, code) => AppError.badRequest(message, code),
  VERTICAL_NOT_REGISTERED: (message, code) => AppError.badRequest(message, code),
  INVALID_ORGANIZATION_ID: (message, code) => AppError.badRequest(message, code),
  ORGANIZATION_NOT_FOUND: (message, code) => AppError.notFound(message, code),
};

export class OrganizationController {
  constructor(
    private readonly createOrganizationService: CreateOrganizationService,
    private readonly getOrganizationService: GetOrganizationService,
    private readonly listOrganizationsService: ListOrganizationsService
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.createOrganizationService.execute(req.body);
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
      const organizationId = String(req.params.id || '');
      const input: { organizationId: string; include?: string } = { organizationId };
      if (req.query.include) {
        input.include = String(req.query.include);
      }
      const output = await this.getOrganizationService.execute(input);
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
      const output = await this.listOrganizationsService.execute(input);
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
