import { CouponCodeMissingError } from '../errors/coupon-code-missing.error';

export type CartCouponType = 'PERCENTAGE' | 'FIXED' | 'FREE_SHIPPING';
export type CartCouponScope = 'ORDER' | 'ITEM' | 'SHIPPING';

export class CartCoupon {
  public readonly code: string;
  public readonly type?: CartCouponType;
  public readonly scope?: CartCouponScope;
  public readonly value?: number;
  public readonly currency?: string;
  public readonly minOrderTotal?: number;
  public readonly maxDiscount?: number;
  public readonly startAt?: Date;
  public readonly endAt?: Date;
  public readonly usageLimit?: number;
  public readonly usagePerCustomer?: number;
  public readonly combinable?: boolean;
  public readonly appliedItemSkus?: string[];

  constructor(
    code: string,
    options?: {
      type?: CartCouponType;
      scope?: CartCouponScope;
      value?: number;
      currency?: string;
      minOrderTotal?: number;
      maxDiscount?: number;
      startAt?: Date;
      endAt?: Date;
      usageLimit?: number;
      usagePerCustomer?: number;
      combinable?: boolean;
      appliedItemSkus?: string[];
    }
  ) {
    if (!code) {
      throw new CouponCodeMissingError();
    }

    this.code = code;
    if (options?.type !== undefined) this.type = options.type;
    if (options?.scope !== undefined) this.scope = options.scope;
    if (options?.value !== undefined) this.value = options.value;
    if (options?.currency !== undefined) this.currency = options.currency;
    if (options?.minOrderTotal !== undefined) this.minOrderTotal = options.minOrderTotal;
    if (options?.maxDiscount !== undefined) this.maxDiscount = options.maxDiscount;
    if (options?.startAt !== undefined) this.startAt = options.startAt;
    if (options?.endAt !== undefined) this.endAt = options.endAt;
    if (options?.usageLimit !== undefined) this.usageLimit = options.usageLimit;
    if (options?.usagePerCustomer !== undefined) this.usagePerCustomer = options.usagePerCustomer;
    if (options?.combinable !== undefined) this.combinable = options.combinable;
    if (options?.appliedItemSkus !== undefined) this.appliedItemSkus = options.appliedItemSkus;
  }
}
