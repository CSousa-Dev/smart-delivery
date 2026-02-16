import { Request, Response, NextFunction } from 'express';
import { ListVerticalsService } from '../../../application/services/list-verticals.service';
import { AppError } from '../../../../../shared/utils/AppError';

export class VerticalController {
  constructor(private readonly listVerticalsService: ListVerticalsService) {}

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const output = await this.listVerticalsService.execute();
      res.status(200).json({ success: true, data: output });
    } catch (error) {
      next(this.mapError(error));
    }
  }

  private mapError(_error: unknown): Error {
    return AppError.internal();
  }
}
