import { randomUUID } from 'crypto';
import { AllowedValueName, AllowedValueValue } from './allowed-value.entity';

export class VerticalAllowedValueId {
  private constructor(public readonly value: string) {}

  static create(value?: string): VerticalAllowedValueId {
    return new VerticalAllowedValueId(value ?? randomUUID());
  }
}

export interface CreateVerticalAllowedValueProps {
  id?: string;
  verticalAttributeId: string;
  name: string;
  value: string;
  description?: string | null;
  minLength: number;
  maxLength: number;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class VerticalAllowedValue {
  private constructor(
    private readonly id: VerticalAllowedValueId,
    private readonly verticalAttributeId: string,
    private readonly name: AllowedValueName,
    private readonly value: AllowedValueValue,
    private readonly description: string | null,
    private readonly createdAt: Date,
    private readonly updatedAt: Date | null
  ) {}

  static create(props: CreateVerticalAllowedValueProps): VerticalAllowedValue {
    const name = AllowedValueName.create(props.name);
    const value = AllowedValueValue.create(props.value, props.minLength, props.maxLength);

    return new VerticalAllowedValue(
      VerticalAllowedValueId.create(props.id),
      props.verticalAttributeId,
      name,
      value,
      props.description?.trim() ?? null,
      props.createdAt ?? new Date(),
      props.updatedAt ?? null
    );
  }

  getId(): VerticalAllowedValueId {
    return this.id;
  }

  getVerticalAttributeId(): string {
    return this.verticalAttributeId;
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
