import { CouponCodeMissingError } from '../errors/coupon-code-missing.error';

export class CartCoupon {
  public readonly code: string;

  constructor(code: string) {
    if (!code) {
      throw new CouponCodeMissingError();
    }

    this.code = code;
  }
}
