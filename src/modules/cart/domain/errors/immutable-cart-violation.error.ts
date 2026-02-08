import { DomainError } from '../../../../shared/errors/domain.error';
import { CartStatus } from '../entities/cart-status.enum';

export class ImmutableCartViolationError extends DomainError {
  constructor(status: CartStatus, message: string) {
    super(`Cannot modify cart with status: ${status}. ${message}`, 'IMMUTABLE_CART_VIOLATION', {
      status,
    });
  }
}
