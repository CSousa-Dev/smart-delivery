import { CartStatus } from '../../domain/entities/cart-status.enum';

export type CartStatusHistoryOutputDTO = {
  status: CartStatus;
  changedAt: Date;
  durationMs?: number | undefined;
};

export type CartAddonOutputDTO = {
  id: string;
  sku: string;
  additionalDescription?: string | undefined;
  quantity: number;
};

export type CartRemovalOutputDTO = {
  sku: string;
};

export type CartItemOutputDTO = {
  id: string;
  productCatalogId: string;
  sku: string;
  description: string;
  quantity: number;
  addons: CartAddonOutputDTO[];
  removals: CartRemovalOutputDTO[];
  businessUnitId: string;
  verticalId: string;
  categories: string[];
};

export type CartReadOutputDTO = {
  id: string;
  status: CartStatus;
  addressId: string | null;
  fulfillmentPlanId: string | null;
  deliveryPrice: number | null;
  paymentPreferenceId: string | null;
  quoteId: string | null;
  paymentId: string | null;
  paymentMismatchReason: string | null;
  items: CartItemOutputDTO[];
  coupons: string[];
  statusHistory: CartStatusHistoryOutputDTO[];
};
