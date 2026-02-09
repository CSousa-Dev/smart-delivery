/**
 * Global Error Handler Middleware
 * Trata todos os erros da aplicação de forma centralizada
 */

import { Request, Response, NextFunction } from 'express';
import { config } from '../../config/environment';
import { AppError } from '../utils/AppError';

export function errorHandler(
  error: Error | AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  // Se for um AppError customizado, usa os valores dele
  if (error instanceof AppError) {
    const code = error.code ?? 'INTERNAL_ERROR';
    res.status(error.statusCode).json({
      success: false,
      error: {
        message: code,
        code,
        ...(error.payload && { ...error.payload }),
        ...(config.nodeEnv === 'development' && { stack: error.stack }),
      },
    });
    return;
  }

  // Erro genérico
  res.status(500).json({
    success: false,
    error: {
      message: 'INTERNAL_ERROR',
      code: 'INTERNAL_ERROR',
      ...(config.nodeEnv === 'development' && { stack: error.stack }),
    },
  });
}

