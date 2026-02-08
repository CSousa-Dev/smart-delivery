import { RemovalValidationService } from '../../modules/cart/domain/ports/removal-validation.service';
import type { CartItem } from '../../modules/cart/domain/entities/cart-item.entity';

/**
 * Mock do RemovalValidationService. Retorna { isValid: true } = removals permitidos.
 * Substituir por adapter que chama API de catálogo quando disponível.
 */
export class RemovalValidationServiceMock implements RemovalValidationService {
  async validateRemovalsForItem(_item: CartItem) {
    return Promise.resolve({ isValid: true });
  }
}
