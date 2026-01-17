import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../../../../shared/utils/AppError';

export function accessControlMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const actorUserId = String(req.headers['x-actor-user-id'] || '');
  const requestedUserId = req.params.id;

  if (!actorUserId) {
    next(AppError.forbidden('Forbidden', 'FORBIDDEN'));
    return;
  }

  const isUserRoute = req.originalUrl?.includes('/organization/users/');
  if (isUserRoute && requestedUserId && actorUserId !== requestedUserId) {
    next(AppError.forbidden('Forbidden', 'FORBIDDEN'));
    return;
  }

  next();
}
