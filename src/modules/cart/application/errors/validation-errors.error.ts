import type { ProductValidationErrorItem } from '../../domain/product-validation';

/**
 * Erro de validação de item: propaga a lista exatamente como a API de produtos retorna.
 */
export class ValidationErrorsError extends Error {
  public readonly code = 'PRODUCT_VALIDATION_ERRORS';
  public readonly payload: { validationErrors: ProductValidationErrorItem[] };

  constructor(validationErrors: ProductValidationErrorItem[]) {
    const message =
      validationErrors.length === 1
        ? `Product validation failed: ${validationErrors[0]?.code ?? 'UNKNOWN'}`
        : `Product validation failed: ${validationErrors.length} error(s)`;
    super(message);
    this.name = 'ValidationErrorsError';
    this.payload = { validationErrors };
    Object.setPrototypeOf(this, ValidationErrorsError.prototype);
  }
}
