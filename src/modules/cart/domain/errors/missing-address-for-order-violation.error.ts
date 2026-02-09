import { CartStatus } from '../entities/cart-status.enum';
import { DomainError } from '../../../../shared/errors/domain.error';

export class MissingAddressForOrderViolationError extends DomainError {
  constructor(status: CartStatus) {
    super('MISSING_ADDRESS_FOR_ORDER', { status });
  }
}
