/**
 * Custom Application Error
 * Permite criar erros com status code e código customizados
 */

function normalizeErrorCode(code?: string): string {
  const normalized = (code ?? 'INTERNAL_ERROR')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
  return normalized || 'INTERNAL_ERROR';
}

export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 500,
    public readonly code?: string,
    public readonly payload?: Record<string, unknown>
  ) {
    const normalizedCode = normalizeErrorCode(code);
    super(normalizedCode);
    this.name = normalizedCode;
    this.message = normalizedCode;
    Error.captureStackTrace(this, this.constructor);
  }

  // Factory methods para erros comuns
  static badRequest(message: string, code?: string, payload?: Record<string, unknown>): AppError {
    return new AppError(message, 400, code || 'BAD_REQUEST', payload);
  }

  static unauthorized(message: string = 'UNAUTHORIZED', code?: string): AppError {
    return new AppError(message, 401, code || 'UNAUTHORIZED');
  }

  static forbidden(message: string = 'FORBIDDEN', code?: string): AppError {
    return new AppError(message, 403, code || 'FORBIDDEN');
  }

  static notFound(message: string = 'NOT_FOUND', code?: string): AppError {
    return new AppError(message, 404, code || 'NOT_FOUND');
  }

  static conflict(message: string, code?: string): AppError {
    return new AppError(message, 409, code || 'CONFLICT');
  }

  static internal(message: string = 'INTERNAL_ERROR', code?: string): AppError {
    return new AppError(message, 500, code || 'INTERNAL_ERROR');
  }
}

