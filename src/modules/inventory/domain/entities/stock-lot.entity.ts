import { randomUUID } from 'crypto';
import { InvalidQuantityError } from '../errors/stock-entry.errors';

export class StockLotId {
  private constructor(public readonly value: string) {}

  static create(value?: string): StockLotId {
    return new StockLotId(value ?? randomUUID());
  }
}

export class BusinessUnitId {
  private constructor(public readonly value: string) {}

  static create(value: string): BusinessUnitId {
    return new BusinessUnitId(value);
  }
}

export class InventoryItemId {
  private constructor(public readonly value: string) {}

  static create(value: string): InventoryItemId {
    return new InventoryItemId(value);
  }
}

export interface CreateStockLotProps {
  id?: string;
  businessUnitId: string;
  itemId: string;
  lotNumber: string;
  expiresAt?: Date | null;
  quantityAvailable: number;
  firstEntryAt: Date;
}

export class StockLot {
  private constructor(
    private readonly id: StockLotId,
    private readonly businessUnitId: BusinessUnitId,
    private readonly itemId: InventoryItemId,
    private readonly lotNumber: string,
    private readonly expiresAt: Date | null,
    private quantityAvailable: number,
    private readonly firstEntryAt: Date
  ) {}

  static create(props: CreateStockLotProps): StockLot {
    if (props.quantityAvailable <= 0) {
      throw new InvalidQuantityError(props.quantityAvailable);
    }

    return new StockLot(
      StockLotId.create(props.id),
      BusinessUnitId.create(props.businessUnitId),
      InventoryItemId.create(props.itemId),
      props.lotNumber,
      props.expiresAt ?? null,
      props.quantityAvailable,
      props.firstEntryAt
    );
  }

  static restore(props: {
    id: string;
    businessUnitId: string;
    itemId: string;
    lotNumber: string;
    expiresAt: Date | null;
    quantityAvailable: number;
    firstEntryAt: Date;
  }): StockLot {
    return new StockLot(
      StockLotId.create(props.id),
      BusinessUnitId.create(props.businessUnitId),
      InventoryItemId.create(props.itemId),
      props.lotNumber,
      props.expiresAt,
      props.quantityAvailable,
      props.firstEntryAt
    );
  }

  increment(quantity: number): void {
    if (quantity <= 0) {
      throw new InvalidQuantityError(quantity);
    }
    this.quantityAvailable += quantity;
  }

  getId(): StockLotId {
    return this.id;
  }

  getBusinessUnitId(): string {
    return this.businessUnitId.value;
  }

  getItemId(): string {
    return this.itemId.value;
  }

  getLotNumber(): string {
    return this.lotNumber;
  }

  getExpiresAt(): Date | null {
    return this.expiresAt;
  }

  getQuantityAvailable(): number {
    return this.quantityAvailable;
  }

  getFirstEntryAt(): Date {
    return this.firstEntryAt;
  }
}
