import { DomainError } from '../../../../shared/errors/domain.error';
import { CartStatus } from '../entities/cart-status.enum';

export class ImmutableCartViolationError extends DomainError {
  constructor(status: CartStatus, action: string) {
    super('IMMUTABLE_CART_VIOLATION', {
      status,
      action,
    });
  }
}
