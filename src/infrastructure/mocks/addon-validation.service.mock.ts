import { AddonValidationService } from '../../modules/cart/domain/ports/addon-validation.service';
import type { CartItem } from '../../modules/cart/domain/entities/cart-item.entity';

/**
 * Mock do AddonValidationService. Retorna { isValid: true } = addons válidos.
 * Substituir por adapter que chama API de catálogo/regras de addon quando disponível.
 */
export class AddonValidationServiceMock implements AddonValidationService {
  async validateAddonsForItem(_item: CartItem) {
    return Promise.resolve({ isValid: true });
  }
}
