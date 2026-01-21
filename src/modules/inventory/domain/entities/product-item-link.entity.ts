import { randomUUID } from 'crypto';

export class ProductItemLinkId {
  private constructor(public readonly value: string) {}

  static create(value?: string): ProductItemLinkId {
    return new ProductItemLinkId(value ?? randomUUID());
  }
}

export class BusinessUnitId {
  private constructor(public readonly value: string) {}

  static create(value: string): BusinessUnitId {
    return new BusinessUnitId(value);
  }
}

export class ProductId {
  private constructor(public readonly value: string) {}

  static create(value: string): ProductId {
    return new ProductId(value);
  }
}

export class InventoryItemId {
  private constructor(public readonly value: string) {}

  static create(value: string): InventoryItemId {
    return new InventoryItemId(value);
  }
}

export enum LinkStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface CreateProductItemLinkProps {
  id?: string;
  businessUnitId: string;
  productId: string;
  itemId: string;
  createdBy: string;
  createdAt?: Date;
  updatedBy?: string | null;
  updatedAt?: Date | null;
  status?: LinkStatus;
}

export class ProductItemLink {
  private constructor(
    private readonly id: ProductItemLinkId,
    private readonly businessUnitId: BusinessUnitId,
    private readonly productId: ProductId,
    private readonly itemId: InventoryItemId,
    private status: LinkStatus,
    private readonly createdBy: string,
    private readonly createdAt: Date,
    private updatedBy: string | null,
    private updatedAt: Date | null
  ) {}

  static create(props: CreateProductItemLinkProps): ProductItemLink {
    return new ProductItemLink(
      ProductItemLinkId.create(props.id),
      BusinessUnitId.create(props.businessUnitId),
      ProductId.create(props.productId),
      InventoryItemId.create(props.itemId),
      props.status ?? LinkStatus.ACTIVE,
      props.createdBy,
      props.createdAt ?? new Date(),
      props.updatedBy ?? null,
      props.updatedAt ?? null
    );
  }

  static restore(props: {
    id: string;
    businessUnitId: string;
    productId: string;
    itemId: string;
    status: LinkStatus;
    createdBy: string;
    createdAt: Date;
    updatedBy: string | null;
    updatedAt: Date | null;
  }): ProductItemLink {
    return new ProductItemLink(
      ProductItemLinkId.create(props.id),
      BusinessUnitId.create(props.businessUnitId),
      ProductId.create(props.productId),
      InventoryItemId.create(props.itemId),
      props.status,
      props.createdBy,
      props.createdAt,
      props.updatedBy,
      props.updatedAt
    );
  }

  activate(updatedBy: string): void {
    if (this.status === LinkStatus.ACTIVE) {
      return;
    }
    this.status = LinkStatus.ACTIVE;
    this.updatedBy = updatedBy;
    this.updatedAt = new Date();
  }

  deactivate(updatedBy: string): void {
    if (this.status === LinkStatus.INACTIVE) {
      return;
    }
    this.status = LinkStatus.INACTIVE;
    this.updatedBy = updatedBy;
    this.updatedAt = new Date();
  }

  getId(): ProductItemLinkId {
    return this.id;
  }

  getBusinessUnitId(): string {
    return this.businessUnitId.value;
  }

  getProductId(): string {
    return this.productId.value;
  }

  getItemId(): string {
    return this.itemId.value;
  }

  getStatus(): LinkStatus {
    return this.status;
  }

  getCreatedBy(): string {
    return this.createdBy;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedBy(): string | null {
    return this.updatedBy;
  }

  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }
}
