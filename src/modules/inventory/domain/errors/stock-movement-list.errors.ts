import { DomainError } from './domain.error';

export class InvalidDateRangeError extends DomainError {
  constructor(start: Date, end: Date) {
    super('Invalid date range', 'INVALID_DATE_RANGE', { start, end });
  }
}

export class InvalidMovementTypeError extends DomainError {
  constructor(type: string) {
    super('Invalid movement type', 'INVALID_MOVEMENT_TYPE', { type });
  }
}

export class InvalidMovementSourceError extends DomainError {
  constructor(source: string) {
    super('Invalid movement source', 'INVALID_MOVEMENT_SOURCE', { source });
  }
}

export class InvalidPaginationError extends DomainError {
  constructor(page: number, pageSize: number) {
    super('Invalid pagination', 'INVALID_PAGINATION', { page, pageSize });
  }
}
