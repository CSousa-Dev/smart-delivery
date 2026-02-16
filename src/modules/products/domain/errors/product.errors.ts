import { DomainError } from './domain.error';

export class InvalidProductCodeError extends DomainError {
  constructor(code: string) {
    super('Invalid product-api code format', 'INVALID_PRODUCT_CODE', { code });
  }
}

export class InvalidProductTitleError extends DomainError {
  constructor(title: string) {
    super('Invalid product-api title', 'INVALID_PRODUCT_TITLE', { title });
  }
}

export class InvalidProductShortDescriptionError extends DomainError {
  constructor(shortDescription: string) {
    super('Invalid product-api short description', 'INVALID_PRODUCT_SHORT_DESCRIPTION', {
      shortDescription,
    });
  }
}

export class InvalidProductDescriptionError extends DomainError {
  constructor(description: string) {
    super('Invalid product-api description', 'INVALID_PRODUCT_DESCRIPTION', {
      description,
    });
  }
}

export class InvalidProductImagesError extends DomainError {
  constructor() {
    super('Invalid product-api images configuration', 'INVALID_PRODUCT_IMAGES');
  }
}

export class InvalidProductAttributesError extends DomainError {
  constructor() {
    super('Invalid product-api attributes', 'INVALID_PRODUCT_ATTRIBUTES');
  }
}

export class MissingRequiredAttributesError extends DomainError {
  constructor() {
    super('Missing required product-api attributes', 'MISSING_REQUIRED_ATTRIBUTES');
  }
}

export class BusinessUnitNotFoundError extends DomainError {
  constructor(businessUnitId: string) {
    super('Business unit not found', 'BUSINESS_UNIT_NOT_FOUND', { businessUnitId });
  }
}

export class CategoryNotFoundError extends DomainError {
  constructor(categoryId: string) {
    super('Category not found', 'CATEGORY_NOT_FOUND', { categoryId });
  }
}

export class BusinessUnitOrganizationMismatchError extends DomainError {
  constructor(businessUnitId: string, organizationId: string) {
    super('Business unit does not belong to organization', 'BUSINESS_UNIT_ORGANIZATION_MISMATCH', {
      businessUnitId,
      organizationId,
    });
  }
}

export class CategoryVerticalNotEnabledError extends DomainError {
  constructor(categoryId: string, verticalCode: string) {
    super('Category vertical not enabled for business unit', 'CATEGORY_VERTICAL_NOT_ENABLED', {
      categoryId,
      verticalCode,
    });
  }
}

export class UserNotOwnerError extends DomainError {
  constructor(userId: string, organizationId: string) {
    super('User is not owner of organization', 'USER_NOT_OWNER', {
      userId,
      organizationId,
    });
  }
}

export class ProductCodeAlreadyExistsError extends DomainError {
  constructor(code: string) {
    super('Product code already exists', 'PRODUCT_CODE_ALREADY_EXISTS', { code });
  }
}

export class ProductTitleAlreadyExistsError extends DomainError {
  constructor(title: string) {
    super('Product title already exists', 'PRODUCT_TITLE_ALREADY_EXISTS', { title });
  }
}
