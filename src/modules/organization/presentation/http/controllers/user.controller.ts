import { Request, Response, NextFunction } from 'express';
import { CreateUserService } from '../../../application/services/create-user.service';
import { GetUserService } from '../../../application/services/get-user.service';
import { ListUsersService } from '../../../application/services/list-users.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  ORGANIZATION_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  DOCUMENT_ALREADY_EXISTS: (message, code) => AppError.conflict(message, code),
  EMAIL_ALREADY_EXISTS: (message, code) => AppError.conflict(message, code),
  PHONE_ALREADY_EXISTS: (message, code) => AppError.conflict(message, code),
  INVALID_DOCUMENT: (message, code) => AppError.badRequest(message, code),
  INVALID_DOCUMENT_TYPE: (message, code) => AppError.badRequest(message, code),
  INVALID_EMAIL: (message, code) => AppError.badRequest(message, code),
  INVALID_PHONE: (message, code) => AppError.badRequest(message, code),
  INVALID_USER_ID: (message, code) => AppError.badRequest(message, code),
  USER_NOT_FOUND: (message, code) => AppError.notFound(message, code),
};

export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
    private readonly listUsersService: ListUsersService
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.createUserService.execute(req.body);
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
      const userId = String(req.params.id || '');
      const output = await this.getUserService.execute({
        userId,
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
      const output = await this.listUsersService.execute(input);
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
