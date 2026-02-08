import type {
  ProductValidationPayload,
  ProductValidationResult,
} from '../product-validation';

export interface ProductService {
  /**
   * Valida produto na unidade de negócio: existência, ativo, addons e removals.
   * A API de produtos valida todo o contexto internamente.
   */
  validateProduct(
    businessUnitId: string,
    product: ProductValidationPayload
  ): Promise<ProductValidationResult>;
}
