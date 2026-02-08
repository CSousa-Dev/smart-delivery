/**
 * Custom Application Error
 * Permite criar erros com status code e código customizados
 */

export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500,
    public readonly code?: string,
    public readonly payload?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }

  // Factory methods para erros comuns
  static badRequest(message: string, code?: string, payload?: Record<string, unknown>): AppError {
    return new AppError(message, 400, code || 'BAD_REQUEST', payload);
  }

  static unauthorized(message: string = 'Unauthorized', code?: string): AppError {
    return new AppError(message, 401, code || 'UNAUTHORIZED');
  }

  static forbidden(message: string = 'Forbidden', code?: string): AppError {
    return new AppError(message, 403, code || 'FORBIDDEN');
  }

  static notFound(message: string = 'Resource not found', code?: string): AppError {
    return new AppError(message, 404, code || 'NOT_FOUND');
  }

  static conflict(message: string, code?: string): AppError {
    return new AppError(message, 409, code || 'CONFLICT');
  }

  static internal(message: string = 'Internal server error', code?: string): AppError {
    return new AppError(message, 500, code || 'INTERNAL_ERROR');
  }
}

