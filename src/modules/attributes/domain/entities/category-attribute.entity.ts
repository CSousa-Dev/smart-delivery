import { randomUUID } from 'crypto';
import { InvalidAttributeLimitsError, InvalidDefaultValueError } from '../errors/attribute.errors';

export type CategoryDefaultValueScope = 'ATTRIBUTE' | 'VERTICAL' | 'CATEGORY';

export class CategoryAttributeId {
  private constructor(public readonly value: string) {}

  static create(value?: string): CategoryAttributeId {
    return new CategoryAttributeId(value ?? randomUUID());
  }
}

export interface CreateCategoryAttributeProps {
  id?: string;
  categoryId: string;
  attributeId: string;
  isRequired?: boolean | null;
  isMultiValue?: boolean | null;
  minValue?: number | null;
  maxValue?: number | null;
  defaultValueScope?: CategoryDefaultValueScope | null;
  defaultValueId?: string | null;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class CategoryAttribute {
  private constructor(
    private readonly id: CategoryAttributeId,
    private readonly categoryId: string,
    private readonly attributeId: string,
    private readonly isRequired: boolean | null,
    private readonly isMultiValue: boolean | null,
    private readonly minValue: number | null,
    private readonly maxValue: number | null,
    private readonly defaultValueScope: CategoryDefaultValueScope | null,
    private readonly defaultValueId: string | null,
    private readonly createdAt: Date,
    private readonly updatedAt: Date | null
  ) {}

  static create(props: CreateCategoryAttributeProps): CategoryAttribute {
    if (
      props.minValue !== null &&
      props.minValue !== undefined &&
      props.maxValue !== null &&
      props.maxValue !== undefined &&
      props.minValue > props.maxValue
    ) {
      throw new InvalidAttributeLimitsError(props.minValue, props.maxValue);
    }

    if (props.defaultValueId && !props.defaultValueScope) {
      throw new InvalidDefaultValueError();
    }

    return new CategoryAttribute(
      CategoryAttributeId.create(props.id),
      props.categoryId,
      props.attributeId,
      props.isRequired ?? null,
      props.isMultiValue ?? null,
      props.minValue ?? null,
      props.maxValue ?? null,
      props.defaultValueScope ?? null,
      props.defaultValueId ?? null,
      props.createdAt ?? new Date(),
      props.updatedAt ?? null
    );
  }

  getId(): CategoryAttributeId {
    return this.id;
  }

  getCategoryId(): string {
    return this.categoryId;
  }

  getAttributeId(): string {
    return this.attributeId;
  }

  getIsRequired(): boolean | null {
    return this.isRequired;
  }

  getIsMultiValue(): boolean | null {
    return this.isMultiValue;
  }

  getMinValue(): number | null {
    return this.minValue;
  }

  getMaxValue(): number | null {
    return this.maxValue;
  }

  getDefaultValueScope(): CategoryDefaultValueScope | null {
    return this.defaultValueScope;
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
