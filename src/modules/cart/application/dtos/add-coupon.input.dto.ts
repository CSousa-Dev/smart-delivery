import { CartCouponScope, CartCouponType } from '../../domain/value-objects/cart-coupon.vo';

export type AddCouponInputDTO = {
  cartId: string;
  actorUserId: string;
  coupon: {
    code: string;
    type?: CartCouponType;
    scope?: CartCouponScope;
    value?: number;
    currency?: string;
    minOrderTotal?: number;
    maxDiscount?: number;
    startAt?: Date | string;
    endAt?: Date | string;
    usageLimit?: number;
    usagePerCustomer?: number;
    combinable?: boolean;
    appliedItemSkus?: string[];
  };
};
