import { randomUUID } from 'crypto';
import {
  InvalidAttributeCodeError,
  InvalidAttributeLimitsError,
  InvalidAttributeTypeError,
} from '../errors/attribute.errors';

export type AttributeTypeValue =
  | 'text'
  | 'number'
  | 'decimal'
  | 'date'
  | 'boolean'
  | 'option'
  | 'url';

export class AttributeId {
  private constructor(public readonly value: string) {}

  static create(value?: string): AttributeId {
    return new AttributeId(value ?? randomUUID());
  }
}

export class AttributeName {
  private constructor(public readonly value: string) {}

  static create(value: string): AttributeName {
    return new AttributeName(value.trim());
  }
}

export class AttributeCode {
  private static readonly CODE_REGEX = /^[A-Z0-9]+(_[A-Z0-9]+)*$/;

  private constructor(public readonly value: string) {}

  static create(value: string): AttributeCode {
    if (!this.CODE_REGEX.test(value)) {
      throw new InvalidAttributeCodeError(value);
    }

    return new AttributeCode(value);
  }
}

export class AttributeType {
  private static readonly ALLOWED_TYPES: AttributeTypeValue[] = [
    'text',
    'number',
    'decimal',
    'date',
    'boolean',
    'option',
    'url',
  ];

  private constructor(public readonly value: AttributeTypeValue) {}

  static create(value: string): AttributeType {
    if (!this.ALLOWED_TYPES.includes(value as AttributeTypeValue)) {
      throw new InvalidAttributeTypeError(value);
    }

    return new AttributeType(value as AttributeTypeValue);
  }
}

export class AttributeLimits {
  private constructor(
    public readonly minValue: number,
    public readonly maxValue: number
  ) {}

  static create(params: {
    type: AttributeTypeValue;
    minValue?: number;
    maxValue?: number;
  }): AttributeLimits {
    const defaults = AttributeLimits.defaultsFor(params.type);
    const minValue = params.minValue ?? defaults.minValue;
    const maxValue = params.maxValue ?? defaults.maxValue;

    if (minValue > maxValue) {
      throw new InvalidAttributeLimitsError(minValue, maxValue);
    }

    return new AttributeLimits(minValue, maxValue);
  }

  private static defaultsFor(type: AttributeTypeValue): {
    minValue: number;
    maxValue: number;
  } {
    switch (type) {
      case 'text':
        return { minValue: 1, maxValue: 255 };
      case 'number':
      case 'decimal':
        return { minValue: -1000000, maxValue: 1000000 };
      case 'option':
        return { minValue: 1, maxValue: 100 };
      default:
        return { minValue: 0, maxValue: 0 };
    }
  }
}

export interface CreateAttributeProps {
  id?: string;
  name: string;
  code: string;
  description: string;
  type: string;
  isMultiValue: boolean;
  isRequired: boolean;
  minValue?: number;
  maxValue?: number;
  defaultValueId?: string | null;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class Attribute {
  private constructor(
    private readonly id: AttributeId,
    private readonly name: AttributeName,
    private readonly code: AttributeCode,
    private readonly description: string,
    private readonly type: AttributeType,
    private readonly isMultiValue: boolean,
    private readonly isRequired: boolean,
    private readonly limits: AttributeLimits,
    private readonly defaultValueId: string | null,
    private readonly createdAt: Date,
    private readonly updatedAt: Date | null
  ) {}

  static create(props: CreateAttributeProps): Attribute {
    const name = AttributeName.create(props.name);
    const code = AttributeCode.create(props.code);
    const type = AttributeType.create(props.type);
    const limits = AttributeLimits.create({
      type: type.value,
      ...(props.minValue !== undefined ? { minValue: props.minValue } : {}),
      ...(props.maxValue !== undefined ? { maxValue: props.maxValue } : {}),
    });

    return new Attribute(
      AttributeId.create(props.id),
      name,
      code,
      props.description.trim(),
      type,
      props.isMultiValue,
      props.isRequired,
      limits,
      props.defaultValueId ?? null,
      props.createdAt ?? new Date(),
      props.updatedAt ?? null
    );
  }

  getId(): AttributeId {
    return this.id;
  }

  getName(): string {
    return this.name.value;
  }

  getCode(): string {
    return this.code.value;
  }

  getDescription(): string {
    return this.description;
  }

  getType(): AttributeTypeValue {
    return this.type.value;
  }

  getIsMultiValue(): boolean {
    return this.isMultiValue;
  }

  getIsRequired(): boolean {
    return this.isRequired;
  }

  getMinValue(): number {
    return this.limits.minValue;
  }

  getMaxValue(): number {
    return this.limits.maxValue;
  }

  getDefaultValueId(): string | null {
    return this.defaultValueId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }
}
