import { ProductService } from '../../modules/cart/domain/ports/product.service';
import type { ProductValidationPayload, ProductValidationResult } from '../../modules/cart/domain/product-validation';

/**
 * Mock do ProductService. Uma chamada valida produto (catálogo + addons + removals).
 * Retorna { isValid: true } = produto válido.
 */
export class ProductServiceMock implements ProductService {
  async validateProduct(
    _businessUnitId: string,
    _product: ProductValidationPayload
  ): Promise<ProductValidationResult> {
    return Promise.resolve({ isValid: true, productValidationErrors: [] });
  }
}
