import { randomUUID } from 'crypto';
import {
  InvalidMovementSourceError,
  InvalidQuantityError,
  MissingExternalIdError,
} from '../errors/stock-entry.errors';

export class StockMovementId {
  private constructor(public readonly value: string) {}

  static create(value?: string): StockMovementId {
    return new StockMovementId(value ?? randomUUID());
  }
}

export enum StockMovementType {
  ENTRY = 'ENTRY',
  EXIT = 'EXIT',
}

export enum StockMovementSource {
  PURCHASE_ORDER = 'PURCHASE_ORDER',
  PRODUCTION_ORDER = 'PRODUCTION_ORDER',
  INVENTORY_ADJUSTMENT = 'INVENTORY_ADJUSTMENT',
  SALES_ORDER = 'SALES_ORDER',
  WASTE = 'WASTE',
}

export interface CreateStockMovementEntryProps {
  businessUnitId: string;
  itemId: string;
  lotNumber: string;
  quantity: number;
  movementSource: string;
  externalId?: string | null;
  occurredAt: Date;
  createdBy: string;
}

export interface CreateStockMovementExitProps {
  businessUnitId: string;
  itemId: string;
  lotNumber: string;
  quantity: number;
  movementSource: string;
  externalId?: string | null;
  occurredAt: Date;
  createdBy: string;
}

export class StockMovement {
  private constructor(
    private readonly id: StockMovementId,
    private readonly businessUnitId: string,
    private readonly itemId: string,
    private readonly lotNumber: string,
    private readonly type: StockMovementType,
    private readonly quantity: number,
    private readonly movementSource: StockMovementSource,
    private readonly externalId: string | null,
    private readonly occurredAt: Date,
    private readonly createdBy: string
  ) {}

  static createEntry(props: CreateStockMovementEntryProps): StockMovement {
    if (props.quantity <= 0) {
      throw new InvalidQuantityError(props.quantity);
    }
    const allowedSources = [
      StockMovementSource.PURCHASE_ORDER,
      StockMovementSource.PRODUCTION_ORDER,
      StockMovementSource.INVENTORY_ADJUSTMENT,
    ];
    if (!allowedSources.includes(props.movementSource as StockMovementSource)) {
      throw new InvalidMovementSourceError(props.movementSource);
    }
    if (
      props.movementSource !== StockMovementSource.INVENTORY_ADJUSTMENT &&
      !props.externalId
    ) {
      throw new MissingExternalIdError();
    }

    return new StockMovement(
      StockMovementId.create(),
      props.businessUnitId,
      props.itemId,
      props.lotNumber,
      StockMovementType.ENTRY,
      props.quantity,
      props.movementSource as StockMovementSource,
      props.externalId ?? null,
      props.occurredAt,
      props.createdBy
    );
  }

  static createExit(props: CreateStockMovementExitProps): StockMovement {
    if (props.quantity <= 0) {
      throw new InvalidQuantityError(props.quantity);
    }
    const allowedSources = [
      StockMovementSource.SALES_ORDER,
      StockMovementSource.PRODUCTION_ORDER,
      StockMovementSource.WASTE,
      StockMovementSource.INVENTORY_ADJUSTMENT,
    ];
    if (!allowedSources.includes(props.movementSource as StockMovementSource)) {
      throw new InvalidMovementSourceError(props.movementSource);
    }
    if (
      props.movementSource !== StockMovementSource.INVENTORY_ADJUSTMENT &&
      !props.externalId
    ) {
      throw new MissingExternalIdError();
    }

    return new StockMovement(
      StockMovementId.create(),
      props.businessUnitId,
      props.itemId,
      props.lotNumber,
      StockMovementType.EXIT,
      props.quantity,
      props.movementSource as StockMovementSource,
      props.externalId ?? null,
      props.occurredAt,
      props.createdBy
    );
  }

  getId(): StockMovementId {
    return this.id;
  }

  getBusinessUnitId(): string {
    return this.businessUnitId;
  }

  getItemId(): string {
    return this.itemId;
  }

  getLotNumber(): string {
    return this.lotNumber;
  }

  getType(): StockMovementType {
    return this.type;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getMovementSource(): StockMovementSource {
    return this.movementSource;
  }

  getExternalId(): string | null {
    return this.externalId;
  }

  getOccurredAt(): Date {
    return this.occurredAt;
  }

  getCreatedBy(): string {
    return this.createdBy;
  }
}
