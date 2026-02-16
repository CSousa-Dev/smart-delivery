import { Request, Response, NextFunction } from 'express';
import { CreateCategoryService } from '../../../application/services/create-category.service';
import { UpdateCategoryService } from '../../../application/services/update-category.service';
import { InactivateCategoryService } from '../../../application/services/inactivate-category.service';
import { ActivateCategoryService } from '../../../application/services/activate-category.service';
import { GetCategoryService } from '../../../application/services/get-category.service';
import { ListCategoriesService } from '../../../application/services/list-categories.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  VERTICAL_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  CATEGORY_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  PARENT_CATEGORY_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  CATEGORY_CODE_ALREADY_EXISTS: (message, code) => AppError.conflict(message, code),
  CATEGORY_NAME_ALREADY_EXISTS: (message, code) => AppError.conflict(message, code),
  INVALID_CATEGORY_CODE: (message, code) => AppError.badRequest(message, code),
  PARENT_CATEGORY_WRONG_VERTICAL: (message, code) => AppError.badRequest(message, code),
  CATEGORY_DEPTH_EXCEEDED: (message, code) => AppError.badRequest(message, code),
  CATEGORY_HIERARCHY_CYCLE: (message, code) => AppError.badRequest(message, code),
  CATEGORY_ALREADY_INACTIVE: (message, code) => AppError.conflict(message, code),
  CATEGORY_ALREADY_ACTIVE: (message, code) => AppError.conflict(message, code),
};

export class CategoryController {
  constructor(
    private readonly createCategoryService: CreateCategoryService,
    private readonly updateCategoryService: UpdateCategoryService,
    private readonly inactivateCategoryService: InactivateCategoryService,
    private readonly activateCategoryService: ActivateCategoryService,
    private readonly getCategoryService: GetCategoryService,
    private readonly listCategoriesService: ListCategoriesService
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.createCategoryService.execute(req.body);
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
      const output = await this.updateCategoryService.execute(req.body);
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
      await this.inactivateCategoryService.execute(req.body);
      res.sendStatus(204);
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async activate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.activateCategoryService.execute(req.body);
      res.sendStatus(204);
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.getCategoryService.execute(req.body);
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
      const verticalId =
        typeof req.query.verticalId === 'string' ? req.query.verticalId : undefined;
      const output = await this.listCategoriesService.execute(
        verticalId ? { verticalId } : {}
      );
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
