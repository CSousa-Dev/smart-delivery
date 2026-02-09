import { DomainError } from '../../../../shared/errors/domain.error';

export class DuplicateCouponViolationError extends DomainError {
  constructor(code: string) {
    super('DUPLICATE_COUPON_VIOLATION', { code });
  }
}
