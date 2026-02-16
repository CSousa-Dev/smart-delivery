import { randomUUID } from 'crypto';
import {
  InvalidVerticalCodeError,
  InvalidVerticalDescriptionError,
  InvalidVerticalNameError,
  VerticalAlreadyActiveError,
  VerticalAlreadyInactiveError,
} from '../errors/vertical.errors';
import { AggregateRoot } from '../../../../shared/contracts/commons/aggregate-root';
import { VerticalDomainEvent } from '../events/vertical-domain-event';
import { VerticalActivatedEvent } from '../events/vertical-activated.event';
import { VerticalInactivatedEvent } from '../events/vertical-inactivated.event';

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
  id?: string;
  name: string;
  code: string;
  description: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class Vertical extends AggregateRoot<VerticalDomainEvent> {
  private constructor(
    private readonly id: VerticalId,
    private name: VerticalName,
    private code: VerticalCode,
    private description: VerticalDescription,
    private isActive: boolean,
    private readonly createdAt: Date,
    private updatedAt: Date | null
  ) {
    super();
  }

  static create(props: CreateVerticalProps): Vertical {
    const name = VerticalName.create(props.name);
    const code = VerticalCode.create(props.code);
    const description = VerticalDescription.create(props.description);

    return new Vertical(
      VerticalId.create(props.id),
      name,
      code,
      description,
      props.isActive ?? true,
      props.createdAt ?? new Date(),
      props.updatedAt ?? null
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

  getIsActive(): boolean {
    return this.isActive;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }

  updateDetails(name: string, code: string, description: string): void {
    this.name = VerticalName.create(name);
    this.code = VerticalCode.create(code);
    this.description = VerticalDescription.create(description);
    this.updatedAt = new Date();
  }

  inactivate(): void {
    if (!this.isActive) {
      throw new VerticalAlreadyInactiveError(this.id.value);
    }

    this.isActive = false;
    this.updatedAt = new Date();
    this.addDomainEvent(
      new VerticalInactivatedEvent(this.id.value, this.getCode(), this.getName())
    );
  }

  activate(): void {
    if (this.isActive) {
      throw new VerticalAlreadyActiveError(this.id.value);
    }

    this.isActive = true;
    this.updatedAt = new Date();
    this.addDomainEvent(
      new VerticalActivatedEvent(this.id.value, this.getCode(), this.getName())
    );
  }
}
