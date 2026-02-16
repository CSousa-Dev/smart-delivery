import { Request, Response, NextFunction } from 'express';
import { LinkAttributeToVerticalService } from '../../../application/services/link-attribute-to-vertical.service';
import { UpdateVerticalAttributeService } from '../../../application/services/update-vertical-attribute.service';
import { UnlinkAttributeFromVerticalService } from '../../../application/services/unlink-attribute-from-vertical.service';
import { ListVerticalAttributesService } from '../../../application/services/list-vertical-attributes.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  VERTICAL_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  ATTRIBUTE_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  VERTICAL_ATTRIBUTE_EXISTS: (message, code) => AppError.conflict(message, code),
  INVALID_ATTRIBUTE_LIMITS: (message, code) => AppError.badRequest(message, code),
  ATTRIBUTE_NOT_OPTION: (message, code) => AppError.badRequest(message, code),
  INVALID_DEFAULT_VALUE: (message, code) => AppError.badRequest(message, code),
  DEFAULT_VALUE_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  ALLOWED_VALUE_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  ALLOWED_VALUE_CONFLICT: (message, code) => AppError.conflict(message, code),
  VERTICAL_ATTRIBUTE_NOT_FOUND: (message, code) => AppError.notFound(message, code),
};

export class VerticalAttributeController {
  constructor(
    private readonly linkAttributeToVerticalService: LinkAttributeToVerticalService,
    private readonly updateVerticalAttributeService: UpdateVerticalAttributeService,
    private readonly unlinkAttributeFromVerticalService: UnlinkAttributeFromVerticalService,
    private readonly listVerticalAttributesService: ListVerticalAttributesService
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.linkAttributeToVerticalService.execute({
        ...req.body,
        verticalId: req.params.verticalId,
      });
      res.status(201).json({
        success: true,
        data: output,
      });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.listVerticalAttributesService.execute({
        verticalId: String(req.params.verticalId),
      });
      res.status(200).json({
        success: true,
        data: output,
      });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.updateVerticalAttributeService.execute({
        ...req.body,
        verticalId: String(req.params.verticalId),
        attributeId: String(req.params.attributeId),
      });
      res.status(200).json({
        success: true,
        data: output,
      });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.unlinkAttributeFromVerticalService.execute({
        verticalId: String(req.params.verticalId),
        attributeId: String(req.params.attributeId),
      });
      res.sendStatus(204);
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
