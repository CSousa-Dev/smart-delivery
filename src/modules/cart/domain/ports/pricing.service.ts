import { Cart } from '../entities/cart.entity';
import { CartCouponScope, CartCouponType } from '../value-objects/cart-coupon.vo';
import { CartPricingDetails } from '../value-objects/cart-pricing-details.vo';
import { AddonDTO } from '../../../../shared/contracts/item/addon/addon.dto';
import { RemovalDTO } from '../../../../shared/contracts/item/removals/removal.dto';

export type PricingCartItemPayload = {
  id: string;
  productCatalogId: string;
  sku: string;
  description: string;
  quantity: number;
  addons: AddonDTO[];
  removals: RemovalDTO[];
  businessUnitId: string;
  verticalId: string;
  categories: string[];
};

export type PricingCouponPayload = {
  code: string;
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
};

export type PricingCouponValidationPayload = {
  cartId: string;
  customerId: string;
  businessUnitId: string;
  verticalId: string;
  paymentPreferenceId: string | null;
  addressId: string | null;
  deliveryPlanId: string | null;
  items: PricingCartItemPayload[];
  coupons: string[];
  candidateCoupon: PricingCouponPayload;
};

export interface PricingService {
  calculatePricing(cart: Cart): Promise<CartPricingDetails>;
  validateCoupon(payload: PricingCouponValidationPayload): Promise<void>;
}
