import { randomUUID } from 'crypto';
import {
  InvalidVerticalCodeError,
  InvalidVerticalDescriptionError,
  InvalidVerticalNameError,
} from '../errors/vertical.errors';

export class VerticalId {
  private constructor(public readonly value: string) {}

  static create(value?: string): VerticalId {
    return new VerticalId(value ?? randomUUID());
  }
}

export class VerticalName {
  private static readonly MIN_LENGTH = 3;
  private static readonly MAX_LENGTH = 100;

  private constructor(public readonly value: string) {}

  static create(value: string): VerticalName {
    const normalized = value.trim();
    if (
      normalized.length < this.MIN_LENGTH ||
      normalized.length > this.MAX_LENGTH
    ) {
      throw new InvalidVerticalNameError(value);
    }

    return new VerticalName(normalized);
  }
}

export class VerticalCode {
  private static readonly CODE_REGEX = /^[A-Z0-9]+(_[A-Z0-9]+)*$/;

  private constructor(public readonly value: string) {}

  static create(value: string): VerticalCode {
    if (!this.CODE_REGEX.test(value)) {
      throw new InvalidVerticalCodeError(value);
    }

    return new VerticalCode(value);
  }
}

export class VerticalDescription {
  private static readonly MIN_LENGTH = 3;
  private static readonly MAX_LENGTH = 255;

  private constructor(public readonly value: string) {}

  static create(value: string): VerticalDescription {
    const normalized = value.trim();
    if (
      normalized.length < this.MIN_LENGTH ||
      normalized.length > this.MAX_LENGTH
    ) {
      throw new InvalidVerticalDescriptionError(value);
    }

    return new VerticalDescription(normalized);
  }
}

export interface CreateVerticalProps {
  name: string;
  code: string;
  description: string;
}

export class Vertical {
  private constructor(
    private readonly id: VerticalId,
    private readonly name: VerticalName,
    private readonly code: VerticalCode,
    private readonly description: VerticalDescription,
    private readonly createdAt: Date,
    private readonly updatedAt: Date | null
  ) {}

  static create(props: CreateVerticalProps): Vertical {
    const name = VerticalName.create(props.name);
    const code = VerticalCode.create(props.code);
    const description = VerticalDescription.create(props.description);

    return new Vertical(
      VerticalId.create(),
      name,
      code,
      description,
      new Date(),
      null
    );
  }

  getId(): VerticalId {
    return this.id;
  }

  getName(): string {
    return this.name.value;
  }

  getCode(): string {
    return this.code.value;
  }

  getDescription(): string {
    return this.description.value;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }
}
