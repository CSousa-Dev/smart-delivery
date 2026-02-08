import { DomainError } from '../../../../shared/errors/domain.error';

export class DuplicateCouponViolationError extends DomainError {
  constructor(code: string) {
    super(`Coupon already applied: ${code}.`, 'DUPLICATE_COUPON_VIOLATION', { code });
  }
}
