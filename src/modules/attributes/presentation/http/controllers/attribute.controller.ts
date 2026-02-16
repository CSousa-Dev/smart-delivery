import { Request, Response, NextFunction } from 'express';
import { CreateAttributeService } from '../../../application/services/create-attribute.service';
import { GetAttributeService } from '../../../application/services/get-attribute.service';
import { ListAttributesService } from '../../../application/services/list-attributes.service';
import { UpdateAttributeService } from '../../../application/services/update-attribute.service';
import { DeleteAttributeService } from '../../../application/services/delete-attribute.service';
import { AppError } from '../../../../../shared/utils/AppError';

const ERROR_STATUS_BY_CODE: Record<string, (message: string, code: string) => AppError> = {
  ATTRIBUTE_CODE_ALREADY_EXISTS: (message, code) => AppError.conflict(message, code),
  ATTRIBUTE_NAME_ALREADY_EXISTS: (message, code) => AppError.conflict(message, code),
  INVALID_ATTRIBUTE_CODE: (message, code) => AppError.badRequest(message, code),
  INVALID_ATTRIBUTE_TYPE: (message, code) => AppError.badRequest(message, code),
  INVALID_ATTRIBUTE_LIMITS: (message, code) => AppError.badRequest(message, code),
  INVALID_DEFAULT_VALUE: (message, code) => AppError.badRequest(message, code),
  DEFAULT_VALUE_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  INVALID_ALLOWED_VALUE_NAME: (message, code) => AppError.badRequest(message, code),
  INVALID_ALLOWED_VALUE_VALUE: (message, code) => AppError.badRequest(message, code),
  ALLOWED_VALUE_OUT_OF_BOUNDS: (message, code) => AppError.badRequest(message, code),
  ALLOWED_VALUE_NAME_EXISTS: (message, code) => AppError.conflict(message, code),
  ALLOWED_VALUE_VALUE_EXISTS: (message, code) => AppError.conflict(message, code),
  ATTRIBUTE_NOT_FOUND: (message, code) => AppError.notFound(message, code),
  ATTRIBUTE_IN_USE: (message, code) => AppError.conflict(message, code),
};

export class AttributeController {
  constructor(
    private readonly createAttributeService: CreateAttributeService,
    private readonly getAttributeService: GetAttributeService,
    private readonly listAttributesService: ListAttributesService,
    private readonly updateAttributeService: UpdateAttributeService,
    private readonly deleteAttributeService: DeleteAttributeService
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.createAttributeService.execute(req.body);
      res.status(201).json({
        success: true,
        data: output,
      });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.getAttributeService.execute({
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

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = typeof req.query.limit === 'string' ? Number(req.query.limit) : undefined;
      const offset = typeof req.query.offset === 'string' ? Number(req.query.offset) : undefined;
      const input: { limit?: number; offset?: number } = {};
      if (typeof limit === 'number' && !Number.isNaN(limit)) {
        input.limit = limit;
      }
      if (typeof offset === 'number' && !Number.isNaN(offset)) {
        input.offset = offset;
      }
      const output = await this.listAttributesService.execute(input);
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
      const output = await this.updateAttributeService.execute({
        ...req.body,
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
      await this.deleteAttributeService.execute({
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
