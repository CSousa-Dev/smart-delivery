import { OperationsService } from '../../modules/cart/domain/ports/operations.service';
import type { CartItem } from '../../modules/cart/domain/entities/cart-item.entity';

/**
 * Mock do OperationsService. Retorna { isValid: true } = venda viável.
 * Substituir por adapter que chama API de operations quando disponível.
 */
export class OperationsServiceMock implements OperationsService {
  async checkSaleFeasibility(_item: CartItem) {
    return Promise.resolve({ isValid: true });
  }
}
