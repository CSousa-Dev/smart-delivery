import { CartItem } from '../entities/cart-item.entity';
import type { ValidationResult } from '../validation-result';

/**
 * Port para validar se, dado um SKU do produto, os removals informados
 * são permitidos (API de catálogo).
 */
export interface RemovalValidationService {
  validateRemovalsForItem(item: CartItem): Promise<ValidationResult>;
}
