export type HttpErrorCatalogEntry = {
  status: number;
  defaultMessage: string;
};

const httpErrorCatalog = new Map<string, HttpErrorCatalogEntry>();

export function registerHttpError(
  code: string,
  entry: HttpErrorCatalogEntry
): void {
  httpErrorCatalog.set(code, entry);
}

export function getHttpError(
  code: string
): HttpErrorCatalogEntry | undefined {
  return httpErrorCatalog.get(code);
}

// Base/common HTTP codes
registerHttpError('BAD_REQUEST', {
  status: 400,
  defaultMessage: 'Bad Request',
});
registerHttpError('UNAUTHORIZED', {
  status: 401,
  defaultMessage: 'Unauthorized',
});
registerHttpError('FORBIDDEN', {
  status: 403,
  defaultMessage: 'Forbidden',
});
registerHttpError('NOT_FOUND', {
  status: 404,
  defaultMessage: 'Not Found',
});
registerHttpError('CONFLICT', {
  status: 409,
  defaultMessage: 'Conflict',
});
registerHttpError('INTERNAL_ERROR', {
  status: 500,
  defaultMessage: 'Internal Server Error',
});

// Products module
registerHttpError('BUSINESS_UNIT_NOT_FOUND', {
  status: 404,
  defaultMessage: 'Business unit not found',
});
registerHttpError('CATEGORY_NOT_FOUND', {
  status: 404,
  defaultMessage: 'Category not found',
});
registerHttpError('BUSINESS_UNIT_ORGANIZATION_MISMATCH', {
  status: 400,
  defaultMessage: 'Business unit does not belong to organization',
});
registerHttpError('CATEGORY_VERTICAL_NOT_ENABLED', {
  status: 400,
  defaultMessage: 'Category vertical not enabled for business unit',
});
registerHttpError('USER_NOT_OWNER', {
  status: 403,
  defaultMessage: 'User is not owner of organization',
});
registerHttpError('PRODUCT_CODE_ALREADY_EXISTS', {
  status: 409,
  defaultMessage: 'Product code already exists',
});
registerHttpError('PRODUCT_TITLE_ALREADY_EXISTS', {
  status: 409,
  defaultMessage: 'Product title already exists',
});
registerHttpError('INVALID_PRODUCT_CODE', {
  status: 400,
  defaultMessage: 'Invalid product code format',
});
registerHttpError('INVALID_PRODUCT_TITLE', {
  status: 400,
  defaultMessage: 'Invalid product title',
});
registerHttpError('INVALID_PRODUCT_SHORT_DESCRIPTION', {
  status: 400,
  defaultMessage: 'Invalid product short description',
});
registerHttpError('INVALID_PRODUCT_DESCRIPTION', {
  status: 400,
  defaultMessage: 'Invalid product description',
});
registerHttpError('INVALID_PRODUCT_IMAGES', {
  status: 400,
  defaultMessage: 'Invalid product images configuration',
});
registerHttpError('INVALID_PRODUCT_ATTRIBUTES', {
  status: 400,
  defaultMessage: 'Invalid product attributes',
});
registerHttpError('MISSING_REQUIRED_ATTRIBUTES', {
  status: 400,
  defaultMessage: 'Missing required product attributes',
});
