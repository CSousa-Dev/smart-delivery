export type HttpErrorCatalogEntry = {
  status: number;
  defaultMessage: string;
};

const httpErrorCatalog = new Map<string, HttpErrorCatalogEntry>();

export function registerHttpError(code: string, entry: HttpErrorCatalogEntry): void {
  httpErrorCatalog.set(code, entry);
}

export function getHttpError(code: string): HttpErrorCatalogEntry | undefined {
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
  defaultMessage: 'Invalid product-api code format',
});
registerHttpError('INVALID_PRODUCT_TITLE', {
  status: 400,
  defaultMessage: 'Invalid product-api title',
});
registerHttpError('INVALID_PRODUCT_SHORT_DESCRIPTION', {
  status: 400,
  defaultMessage: 'Invalid product-api short description',
});
registerHttpError('INVALID_PRODUCT_DESCRIPTION', {
  status: 400,
  defaultMessage: 'Invalid product-api description',
});
registerHttpError('INVALID_PRODUCT_IMAGES', {
  status: 400,
  defaultMessage: 'Invalid product-api images configuration',
});
registerHttpError('INVALID_PRODUCT_ATTRIBUTES', {
  status: 400,
  defaultMessage: 'Invalid product-api attributes',
});
registerHttpError('MISSING_REQUIRED_ATTRIBUTES', {
  status: 400,
  defaultMessage: 'Missing required product-api attributes',
});

// Cart module
registerHttpError('INVALID_BUSINESS_CONTEXT', {
  status: 400,
  defaultMessage: 'CustomerId, verticalId and businessUnitId are required and must be non-empty',
});
registerHttpError('CART_NOT_FOUND', {
  status: 404,
  defaultMessage: 'Cart not found',
});
registerHttpError('CART_ALREADY_OPEN_FOR_CUSTOMER', {
  status: 409,
  defaultMessage: 'There is already an open cart in purchase flow for this customer',
});
registerHttpError('CUSTOMER_CONTEXT_INVALID', {
  status: 400,
  defaultMessage: 'Customer context is invalid for the given business unit',
});
registerHttpError('VERTICAL_CONTEXT_INVALID', {
  status: 400,
  defaultMessage: 'Vertical context is invalid for the given business unit',
});
registerHttpError('IMMUTABLE_CART_VIOLATION', {
  status: 400,
  defaultMessage: 'Cannot modify cart in current status',
});
registerHttpError('ONLINE_PAYMENT_REQUIRED_FOR_WAITING_PAYMENT', {
  status: 400,
  defaultMessage: 'Online payment method is required to wait for payment',
});

// Inventory module
registerHttpError('ORGANIZATION_NOT_FOUND', {
  status: 404,
  defaultMessage: 'Organization not found',
});
registerHttpError('UNIT_CODE_ALREADY_EXISTS', {
  status: 409,
  defaultMessage: 'Unit code already exists',
});
registerHttpError('UNIT_NAME_ALREADY_EXISTS', {
  status: 409,
  defaultMessage: 'Unit name already exists',
});
registerHttpError('INVALID_UNIT_CODE', {
  status: 400,
  defaultMessage: 'Invalid unit code format',
});
registerHttpError('INVALID_UNIT_NAME', {
  status: 400,
  defaultMessage: 'Invalid unit name',
});
registerHttpError('INVALID_UNIT_SYMBOL', {
  status: 400,
  defaultMessage: 'Invalid unit symbol',
});
registerHttpError('INVALID_UNIT_STATUS', {
  status: 400,
  defaultMessage: 'Invalid unit status',
});
registerHttpError('NO_UPDATABLE_FIELDS', {
  status: 400,
  defaultMessage: 'No updatable fields provided',
});
registerHttpError('IMMUTABLE_FIELD_UPDATE', {
  status: 400,
  defaultMessage: 'Immutable field update is not allowed',
});

registerHttpError('BUSINESS_UNIT_NOT_FOUND', {
  status: 404,
  defaultMessage: 'Business unit not found',
});
registerHttpError('BUSINESS_UNIT_ORG_MISMATCH', {
  status: 400,
  defaultMessage: 'Business unit does not belong to organization',
});
registerHttpError('UNIT_OF_MEASURE_NOT_FOUND', {
  status: 404,
  defaultMessage: 'Unit of measure not found',
});
registerHttpError('UNIT_OF_MEASURE_ORG_MISMATCH', {
  status: 400,
  defaultMessage: 'Unit of measure does not belong to organization',
});
registerHttpError('UNIT_OF_MEASURE_INACTIVE', {
  status: 400,
  defaultMessage: 'Unit of measure is inactive',
});
registerHttpError('INVENTORY_ITEM_NAME_EXISTS', {
  status: 409,
  defaultMessage: 'Inventory item name already exists',
});
registerHttpError('INVALID_INVENTORY_ITEM_TYPE', {
  status: 400,
  defaultMessage: 'Invalid inventory item type',
});
registerHttpError('INVALID_INVENTORY_ITEM_NAME', {
  status: 400,
  defaultMessage: 'Invalid inventory item name',
});
registerHttpError('MISSING_REQUIRED_FIELDS', {
  status: 400,
  defaultMessage: 'Missing required fields',
});
registerHttpError('INVALID_REQUIRES_EXPIRATION', {
  status: 400,
  defaultMessage: 'Invalid requiresExpiration value',
});

registerHttpError('PRODUCT_NOT_FOUND', {
  status: 404,
  defaultMessage: 'Product not found',
});
registerHttpError('INVENTORY_ITEM_NOT_FOUND', {
  status: 404,
  defaultMessage: 'Inventory item not found',
});
registerHttpError('PRODUCT_ITEM_BUSINESS_UNIT_MISMATCH', {
  status: 400,
  defaultMessage: 'Product and item must belong to same business unit',
});
registerHttpError('PRODUCT_ALREADY_LINKED', {
  status: 409,
  defaultMessage: 'Product already linked',
});
registerHttpError('ITEM_ALREADY_LINKED', {
  status: 409,
  defaultMessage: 'Item already linked',
});
registerHttpError('PRODUCT_ITEM_LINK_NOT_FOUND', {
  status: 404,
  defaultMessage: 'Product item link not found',
});
registerHttpError('LINK_ALREADY_INACTIVE', {
  status: 409,
  defaultMessage: 'Link already inactive',
});

registerHttpError('LOT_ITEM_CONFLICT', {
  status: 409,
  defaultMessage: 'Lot belongs to a different item',
});
registerHttpError('LOT_EXPIRATION_MISMATCH', {
  status: 409,
  defaultMessage: 'Lot expiration does not match',
});
registerHttpError('INVALID_QUANTITY', {
  status: 400,
  defaultMessage: 'Invalid quantity',
});
registerHttpError('FRACTION_NOT_ALLOWED', {
  status: 400,
  defaultMessage: 'Fraction not allowed for unit of measure',
});
registerHttpError('MISSING_EXPIRATION', {
  status: 400,
  defaultMessage: 'Expiration is required for this item',
});
registerHttpError('INVALID_MOVEMENT_SOURCE', {
  status: 400,
  defaultMessage: 'Invalid movement source',
});
registerHttpError('MISSING_EXTERNAL_ID', {
  status: 400,
  defaultMessage: 'External id is required',
});

registerHttpError('ALLOCATION_SUM_MISMATCH', {
  status: 400,
  defaultMessage: 'Allocation sum mismatch',
});
registerHttpError('LOT_NOT_FOUND', {
  status: 404,
  defaultMessage: 'Lot not found',
});
registerHttpError('LOT_ITEM_MISMATCH', {
  status: 400,
  defaultMessage: 'Lot does not belong to item',
});
registerHttpError('LOT_EXPIRED', {
  status: 400,
  defaultMessage: 'Lot is expired',
});
registerHttpError('LOT_INSUFFICIENT_BALANCE', {
  status: 409,
  defaultMessage: 'Lot has insufficient balance',
});
registerHttpError('INSUFFICIENT_STOCK', {
  status: 409,
  defaultMessage: 'Insufficient stock',
});
registerHttpError('NO_VALID_LOTS', {
  status: 409,
  defaultMessage: 'No valid lots for exit',
});

registerHttpError('INVALID_STOCK_POSITION_QUERY', {
  status: 400,
  defaultMessage: 'Invalid stock position query',
});
registerHttpError('INVALID_DATE_RANGE', {
  status: 400,
  defaultMessage: 'Invalid date range',
});
registerHttpError('INVALID_MOVEMENT_TYPE', {
  status: 400,
  defaultMessage: 'Invalid movement type',
});
registerHttpError('INVALID_PAGINATION', {
  status: 400,
  defaultMessage: 'Invalid pagination',
});
