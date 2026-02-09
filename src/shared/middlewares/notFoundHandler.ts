/**
 * 404 Not Found Handler
 * Captura rotas não encontradas
 */

import { Request, Response } from 'express';

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    error: {
      message: 'ROUTE_NOT_FOUND',
      code: 'ROUTE_NOT_FOUND',
    },
  });
}

