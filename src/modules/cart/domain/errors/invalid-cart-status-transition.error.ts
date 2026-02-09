import { DomainError } from '../../../../shared/errors/domain.error';
import { CartStatus } from '../entities/cart-status.enum';

export class InvalidCartStatusTransitionError extends DomainError {
  constructor(from: CartStatus, to: CartStatus) {
    super('INVALID_CART_STATUS_TRANSITION', {
      from,
      to,
    });
  }
}
