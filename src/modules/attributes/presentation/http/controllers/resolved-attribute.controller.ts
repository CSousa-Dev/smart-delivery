import { Request, Response, NextFunction } from 'express';
import { ResolveAttributeConfigurationService } from '../../../application/services/resolve-attribute-configuration.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  VERTICAL_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  INVALID_CATEGORY_CHAIN: (message, code) => AppError.badRequest(message, code),
  ATTRIBUTE_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  ATTRIBUTE_NOT_IN_VERTICAL: (message, code) => AppError.notFound(message, code),
  NO_ATTRIBUTES_FOR_CONTEXT: (message, code) => AppError.notFound(message, code),
};

export class ResolvedAttributeController {
  constructor(private readonly resolveAttributeConfigurationService: ResolveAttributeConfigurationService) {}

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { verticalId, categoryIds, limit, offset } = req.query;
      const parsedCategoryIds = typeof categoryIds === 'string' ? categoryIds.split(',') : [];
      const input: {
        verticalId?: string;
        categoryIds?: string[];
        limit?: number;
        offset?: number;
      } = {};
      if (typeof verticalId === 'string') {
        input.verticalId = verticalId;
      }
      if (parsedCategoryIds.length > 0) {
        input.categoryIds = parsedCategoryIds;
      }
      if (typeof limit === 'string') {
        input.limit = Number(limit);
      }
      if (typeof offset === 'string') {
        input.offset = Number(offset);
      }

      const output = await this.resolveAttributeConfigurationService.list(input);
      res.status(200).json({
        success: true,
        data: output,
      });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { verticalId, categoryIds, includeCategoryOverrides } = req.query;
      const parsedCategoryIds = typeof categoryIds === 'string' ? categoryIds.split(',') : [];
      const input: { attributeId: string; verticalId?: string; categoryIds?: string[] } = {
        attributeId: String(req.params.attributeId),
      };
      if (typeof verticalId === 'string') {
        input.verticalId = verticalId;
      }
      if (parsedCategoryIds.length > 0) {
        input.categoryIds = parsedCategoryIds;
      }

      const shouldIncludeCategoryOverrides =
        typeof includeCategoryOverrides === 'string'
          ? includeCategoryOverrides === 'true'
          : false;

      if (
        shouldIncludeCategoryOverrides &&
        typeof input.verticalId === 'string' &&
        !input.categoryIds
      ) {
        const output = await this.resolveAttributeConfigurationService.getWithCategoryOverrides({
          attributeId: input.attributeId,
          verticalId: input.verticalId,
        });
        res.status(200).json({
          success: true,
          data: output,
        });
        return;
      }

      const output = await this.resolveAttributeConfigurationService.get(input);
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
