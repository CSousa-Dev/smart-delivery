import { ProductValidationError } from '../entities/product-validation-errors.entity';

export interface ProductService {
  validateProductsExistsInBusinessUnitAndIsActive(
    businessUnitId: string,
    productIds: string[]
  ): Promise<ProductValidationError[] | null>;
}
