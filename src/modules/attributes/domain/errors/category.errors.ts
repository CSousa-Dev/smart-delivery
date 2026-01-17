import { DomainError } from './domain.error';

export class VerticalNotFoundError extends DomainError {
  constructor(verticalId: string) {
    super('Vertical not found', 'VERTICAL_NOT_FOUND', { verticalId });
  }
}

export class ParentCategoryNotFoundError extends DomainError {
  constructor(parentCategoryId: string) {
    super('Parent category not found', 'PARENT_CATEGORY_NOT_FOUND', {
      parentCategoryId,
    });
  }
}

export class CategoryCodeAlreadyExistsError extends DomainError {
  constructor(code: string) {
    super('Category code already exists', 'CATEGORY_CODE_ALREADY_EXISTS', { code });
  }
}

export class CategoryNameAlreadyExistsError extends DomainError {
  constructor(name: string) {
    super('Category name already exists', 'CATEGORY_NAME_ALREADY_EXISTS', { name });
  }
}

export class InvalidCategoryCodeError extends DomainError {
  constructor(code: string) {
    super('Invalid category code format', 'INVALID_CATEGORY_CODE', { code });
  }
}

export class ParentCategoryDifferentVerticalError extends DomainError {
  constructor(parentCategoryId: string, verticalId: string) {
    super('Parent category belongs to another vertical', 'PARENT_CATEGORY_WRONG_VERTICAL', {
      parentCategoryId,
      verticalId,
    });
  }
}

export class CategoryDepthExceededError extends DomainError {
  constructor(depth: number) {
    super('Category depth exceeded', 'CATEGORY_DEPTH_EXCEEDED', { depth });
  }
}

export class InvalidCategoryHierarchyError extends DomainError {
  constructor() {
    super('Category hierarchy cycle detected', 'CATEGORY_HIERARCHY_CYCLE');
  }
}
