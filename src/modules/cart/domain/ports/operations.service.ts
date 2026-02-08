import { CartItem } from '../entities/cart-item.entity';
import type { ValidationResult } from '../validation-result';

/**
 * Port para consultar a API de operations se é possível realizar a venda
 * do produto para a quantidade, addons e removals informados.
 */
export interface OperationsService {
  checkSaleFeasibility(item: CartItem): Promise<ValidationResult>;
}
