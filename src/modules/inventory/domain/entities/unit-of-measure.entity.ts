import { randomUUID } from 'crypto';
import {
  InvalidUnitCodeError,
  InvalidUnitNameError,
  InvalidUnitSymbolError,
} from '../errors/unit-of-measure.errors';

export class UnitOfMeasureId {
  private constructor(public readonly value: string) {}

  static create(value?: string): UnitOfMeasureId {
    return new UnitOfMeasureId(value ?? randomUUID());
  }
}

export class OrganizationId {
  private constructor(public readonly value: string) {}

  static create(value: string): OrganizationId {
    return new OrganizationId(value);
  }
}

export class UnitCode {
  private static readonly CODE_REGEX = /^[A-Za-z0-9]+$/;

  private constructor(
    public readonly value: string,
    public readonly normalized: string
  ) {}

  static create(value: string): UnitCode {
    const trimmed = value.trim();
    if (!trimmed || trimmed.length > 10 || trimmed !== value) {
      throw new InvalidUnitCodeError(value);
    }
    if (!this.CODE_REGEX.test(trimmed)) {
      throw new InvalidUnitCodeError(value);
    }

    return new UnitCode(trimmed, trimmed.toUpperCase());
  }
}

export class UnitName {
  private constructor(
    public readonly value: string,
    public readonly normalized: string
  ) {}

  static create(value: string): UnitName {
    const trimmed = value.trim();
    if (trimmed.length < 2 || trimmed.length > 60) {
      throw new InvalidUnitNameError(value);
    }

    return new UnitName(trimmed, trimmed.toLowerCase());
  }
}

export class UnitSymbol {
  private constructor(public readonly value: string) {}

  static create(value: string): UnitSymbol {
    const trimmed = value.trim();
    if (trimmed.length < 1 || trimmed.length > 10 || trimmed !== value) {
      throw new InvalidUnitSymbolError(value);
    }

    return new UnitSymbol(trimmed);
  }
}

export enum UnitStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface CreateUnitOfMeasureProps {
  id?: string;
  organizationId: string;
  code: string;
  name: string;
  symbol: string;
  allowsFraction: boolean;
  createdBy: string;
  createdAt?: Date;
  updatedBy?: string | null;
  updatedAt?: Date | null;
}

export class UnitOfMeasure {
  private constructor(
    private readonly id: UnitOfMeasureId,
    private readonly organizationId: OrganizationId,
    private readonly code: UnitCode,
    private name: UnitName,
    private readonly symbol: UnitSymbol,
    private readonly allowsFraction: boolean,
    private status: UnitStatus,
    private readonly createdBy: string,
    private readonly createdAt: Date,
    private updatedBy: string | null,
    private updatedAt: Date | null
  ) {}

  static create(props: CreateUnitOfMeasureProps): UnitOfMeasure {
    return new UnitOfMeasure(
      UnitOfMeasureId.create(props.id),
      OrganizationId.create(props.organizationId),
      UnitCode.create(props.code),
      UnitName.create(props.name),
      UnitSymbol.create(props.symbol),
      props.allowsFraction,
      UnitStatus.ACTIVE,
      props.createdBy,
      props.createdAt ?? new Date(),
      props.updatedBy ?? null,
      props.updatedAt ?? null
    );
  }

  static restore(props: {
    id: string;
    organizationId: string;
    code: string;
    name: string;
    symbol: string;
    allowsFraction: boolean;
    status: UnitStatus;
    createdBy: string;
    createdAt: Date;
    updatedBy: string | null;
    updatedAt: Date | null;
  }): UnitOfMeasure {
    return new UnitOfMeasure(
      UnitOfMeasureId.create(props.id),
      OrganizationId.create(props.organizationId),
      UnitCode.create(props.code),
      UnitName.create(props.name),
      UnitSymbol.create(props.symbol),
      props.allowsFraction,
      props.status,
      props.createdBy,
      props.createdAt,
      props.updatedBy,
      props.updatedAt
    );
  }

  updateName(name: string, updatedBy: string): void {
    this.name = UnitName.create(name);
    this.updatedBy = updatedBy;
    this.updatedAt = new Date();
  }

  changeStatus(status: UnitStatus, updatedBy: string): void {
    this.status = status;
    this.updatedBy = updatedBy;
    this.updatedAt = new Date();
  }

  getId(): UnitOfMeasureId {
    return this.id;
  }

  getOrganizationId(): string {
    return this.organizationId.value;
  }

  getCode(): string {
    return this.code.value;
  }

  getCodeNormalized(): string {
    return this.code.normalized;
  }

  getName(): string {
    return this.name.value;
  }

  getNameNormalized(): string {
    return this.name.normalized;
  }

  getSymbol(): string {
    return this.symbol.value;
  }

  getAllowsFraction(): boolean {
    return this.allowsFraction;
  }

  getStatus(): UnitStatus {
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
