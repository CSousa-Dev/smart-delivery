import { randomUUID } from 'crypto';
import {
  InvalidInventoryItemNameError,
  InvalidInventoryItemTypeError,
  InvalidRequiresExpirationError,
  MissingRequiredFieldsError,
} from '../errors/inventory-item.errors';

export class InventoryItemId {
  private constructor(public readonly value: string) {}

  static create(value?: string): InventoryItemId {
    return new InventoryItemId(value ?? randomUUID());
  }
}

export class OrganizationId {
  private constructor(public readonly value: string) {}

  static create(value: string): OrganizationId {
    return new OrganizationId(value);
  }
}

export class BusinessUnitId {
  private constructor(public readonly value: string) {}

  static create(value: string): BusinessUnitId {
    return new BusinessUnitId(value);
  }
}

export class UnitOfMeasureId {
  private constructor(public readonly value: string) {}

  static create(value: string): UnitOfMeasureId {
    return new UnitOfMeasureId(value);
  }
}

export class InventoryItemName {
  private constructor(
    public readonly value: string,
    public readonly normalized: string
  ) {}

  static create(value: string): InventoryItemName {
    const trimmed = value.trim();
    if (trimmed.length < 2 || trimmed.length > 120) {
      throw new InvalidInventoryItemNameError(value);
    }

    return new InventoryItemName(trimmed, trimmed.toLowerCase());
  }
}

export enum InventoryItemType {
  INSUMO = 'INSUMO',
  ITEM_FINAL = 'ITEM_FINAL',
  EMBALAGEM = 'EMBALAGEM',
}

export class InventoryItemTypeValue {
  private constructor(public readonly value: InventoryItemType) {}

  static create(value: string): InventoryItemTypeValue {
    if (!Object.values(InventoryItemType).includes(value as InventoryItemType)) {
      throw new InvalidInventoryItemTypeError(value);
    }

    return new InventoryItemTypeValue(value as InventoryItemType);
  }
}

export interface CreateInventoryItemProps {
  id?: string;
  organizationId: string;
  businessUnitId: string;
  name: string;
  type: string;
  unitOfMeasureId: string;
  requiresExpiration: boolean;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class InventoryItem {
  private constructor(
    private readonly id: InventoryItemId,
    private readonly organizationId: OrganizationId,
    private readonly businessUnitId: BusinessUnitId,
    private readonly name: InventoryItemName,
    private readonly type: InventoryItemTypeValue,
    private readonly unitOfMeasureId: UnitOfMeasureId,
    private readonly requiresExpiration: boolean,
    private readonly createdBy: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date | null
  ) {}

  static create(props: CreateInventoryItemProps): InventoryItem {
    const missingFields: string[] = [];
    if (!props.name) missingFields.push('name');
    if (!props.type) missingFields.push('type');
    if (!props.unitOfMeasureId) missingFields.push('unitOfMeasureId');
    if (props.requiresExpiration === undefined) missingFields.push('requiresExpiration');
    if (missingFields.length > 0) {
      throw new MissingRequiredFieldsError(missingFields);
    }

    if (typeof props.requiresExpiration !== 'boolean') {
      throw new InvalidRequiresExpirationError(props.requiresExpiration);
    }

    return new InventoryItem(
      InventoryItemId.create(props.id),
      OrganizationId.create(props.organizationId),
      BusinessUnitId.create(props.businessUnitId),
      InventoryItemName.create(props.name),
      InventoryItemTypeValue.create(props.type),
      UnitOfMeasureId.create(props.unitOfMeasureId),
      props.requiresExpiration,
      props.createdBy,
      props.createdAt ?? new Date(),
      props.updatedAt ?? null
    );
  }

  getId(): InventoryItemId {
    return this.id;
  }

  getOrganizationId(): string {
    return this.organizationId.value;
  }

  getBusinessUnitId(): string {
    return this.businessUnitId.value;
  }

  getName(): string {
    return this.name.value;
  }

  getNameNormalized(): string {
    return this.name.normalized;
  }

  getType(): InventoryItemType {
    return this.type.value;
  }

  getUnitOfMeasureId(): string {
    return this.unitOfMeasureId.value;
  }

  getRequiresExpiration(): boolean {
    return this.requiresExpiration;
  }

  getCreatedBy(): string {
    return this.createdBy;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }
}
