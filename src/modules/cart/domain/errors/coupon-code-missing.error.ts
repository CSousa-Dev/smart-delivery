import { DomainError } from '../../../../shared/errors/domain.error';

export class CouponCodeMissingError extends DomainError {
  constructor() {
    super('Coupon code must be provided.', 'COUPON_CODE_MISSING');
  }
}
