import { randomUUID } from 'crypto';
import {
  AllowedValueLengthOutOfBoundsError,
  InvalidAllowedValueNameError,
  InvalidAllowedValueValueError,
} from '../errors/allowed-value.errors';

export class AllowedValueId {
  private constructor(public readonly value: string) {}

  static create(value?: string): AllowedValueId {
    return new AllowedValueId(value ?? randomUUID());
  }
}

export class AllowedValueName {
  private constructor(public readonly value: string) {}

  static create(value: string): AllowedValueName {
    const normalized = value.trim();
    if (!normalized) {
      throw new InvalidAllowedValueNameError();
    }

    return new AllowedValueName(normalized);
  }

  static restore(value: string): AllowedValueName {
    return new AllowedValueName(value);
  }
}

export class AllowedValueValue {
  private static readonly PASCAL_CASE_REGEX =
    /^[A-Z][a-z0-9]*(?:[A-Z][a-z0-9]*)*(?: [A-Z][a-z0-9]*)*$/;

  private constructor(public readonly value: string) {}

  static create(value: string, minValue: number, maxValue: number): AllowedValueValue {
    const normalized = value.trim();

    if (!this.PASCAL_CASE_REGEX.test(normalized)) {
      throw new InvalidAllowedValueValueError(normalized);
    }

    const length = normalized.length;
    if (length < minValue || length > maxValue) {
      throw new AllowedValueLengthOutOfBoundsError(minValue, maxValue, length);
    }

    return new AllowedValueValue(normalized);
  }

  static restore(value: string): AllowedValueValue {
    return new AllowedValueValue(value);
  }
}

export interface CreateAllowedValueProps {
  id?: string;
  attributeId: string;
  name: string;
  value: string;
  description?: string | null;
  minLength: number;
  maxLength: number;
}

export interface RestoreAllowedValueProps {
  id: string;
  attributeId: string;
  name: string;
  value: string;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class AllowedValue {
  private constructor(
    private readonly id: AllowedValueId,
    private readonly attributeId: string,
    private readonly name: AllowedValueName,
    private readonly value: AllowedValueValue,
    private readonly description: string | null,
    private readonly createdAt: Date,
    private readonly updatedAt: Date | null
  ) {}

  static create(props: CreateAllowedValueProps): AllowedValue {
    const name = AllowedValueName.create(props.name);
    const value = AllowedValueValue.create(props.value, props.minLength, props.maxLength);

    return new AllowedValue(
      AllowedValueId.create(props.id),
      props.attributeId,
      name,
      value,
      props.description?.trim() ?? null,
      new Date(),
      null
    );
  }

  static restore(props: RestoreAllowedValueProps): AllowedValue {
    return new AllowedValue(
      AllowedValueId.create(props.id),
      props.attributeId,
      AllowedValueName.restore(props.name),
      AllowedValueValue.restore(props.value),
      props.description ?? null,
      props.createdAt ?? new Date(),
      props.updatedAt ?? null
    );
  }

  getId(): AllowedValueId {
    return this.id;
  }

  getAttributeId(): string {
    return this.attributeId;
  }

  getName(): string {
    return this.name.value;
  }

  getValue(): string {
    return this.value.value;
  }

  getDescription(): string | null {
    return this.description;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }
}
