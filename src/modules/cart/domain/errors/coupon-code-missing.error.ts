import { DomainError } from '../../../../shared/errors/domain.error';

export class CouponCodeMissingError extends DomainError {
  constructor() {
    super('COUPON_CODE_MISSING');
  }
}
