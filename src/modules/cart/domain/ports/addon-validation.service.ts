import { CartItem } from '../entities/cart-item.entity';
import type { ValidationResult } from '../validation-result';

/**
 * Port para validar se um produto pode ter addons e se os addons informados
 * são válidos para aquele pedido (catálogo / regras de negócio).
 */
export interface AddonValidationService {
  validateAddonsForItem(item: CartItem): Promise<ValidationResult>;
}
