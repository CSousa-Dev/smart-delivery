export type AddonInputDTO = {
  id: string;
  sku: string;
  additionalDescription?: string;
  quantity?: number;
};

export type RemovalInputDTO = {
  sku: string;
};

export type CartItemInputDTO = {
  id?: string;
  productCatalogId: string;
  sku: string;
  description: string;
  quantity?: number;
  addons?: AddonInputDTO[];
  removals?: RemovalInputDTO[];
  businessUnitId: string;
  verticalId: string;
  categories?: string[];
};
