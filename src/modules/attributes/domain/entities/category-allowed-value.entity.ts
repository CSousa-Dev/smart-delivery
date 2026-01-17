import { randomUUID } from 'crypto';
import { AllowedValueName, AllowedValueValue } from './allowed-value.entity';

export class CategoryAllowedValueId {
  private constructor(public readonly value: string) {}

  static create(value?: string): CategoryAllowedValueId {
    return new CategoryAllowedValueId(value ?? randomUUID());
  }
}

export interface CreateCategoryAllowedValueProps {
  id?: string;
  categoryAttributeId: string;
  name: string;
  value: string;
  description?: string | null;
  minLength: number;
  maxLength: number;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class CategoryAllowedValue {
  private constructor(
    private readonly id: CategoryAllowedValueId,
    private readonly categoryAttributeId: string,
    private readonly name: AllowedValueName,
    private readonly value: AllowedValueValue,
    private readonly description: string | null,
    private readonly createdAt: Date,
    private readonly updatedAt: Date | null
  ) {}

  static create(props: CreateCategoryAllowedValueProps): CategoryAllowedValue {
    const name = AllowedValueName.create(props.name);
    const value = AllowedValueValue.create(props.value, props.minLength, props.maxLength);

    return new CategoryAllowedValue(
      CategoryAllowedValueId.create(props.id),
      props.categoryAttributeId,
      name,
      value,
      props.description?.trim() ?? null,
      props.createdAt ?? new Date(),
      props.updatedAt ?? null
    );
  }

  getId(): CategoryAllowedValueId {
    return this.id;
  }

  getCategoryAttributeId(): string {
    return this.categoryAttributeId;
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
