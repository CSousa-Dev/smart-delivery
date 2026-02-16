import { DomainError } from './domain.error';

export class CategoryNotFoundError extends DomainError {
  constructor(categoryId: string) {
    super('Category not found', 'CATEGORY_NOT_FOUND', { categoryId });
  }
}

export class CategoryAttributeAlreadyExistsError extends DomainError {
  constructor(categoryId: string, attributeId: string) {
    super('Category attribute link already exists', 'CATEGORY_ATTRIBUTE_EXISTS', {
      categoryId,
      attributeId,
    });
  }
}

export class CategoryAttributeNotFoundError extends DomainError {
  constructor(categoryId: string, attributeId: string) {
    super('Category attribute link not found', 'CATEGORY_ATTRIBUTE_NOT_FOUND', {
      categoryId,
      attributeId,
    });
  }
}

export class AttributeNotLinkedToVerticalError extends DomainError {
  constructor(attributeId: string, verticalId: string) {
    super('Attribute not linked to vertical', 'ATTRIBUTE_NOT_IN_VERTICAL', {
      attributeId,
      verticalId,
    });
  }
}
