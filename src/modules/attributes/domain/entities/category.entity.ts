import { randomUUID } from 'crypto';
import {
  CategoryAlreadyActiveError,
  CategoryAlreadyInactiveError,
  InvalidCategoryCodeError,
} from '../errors/category.errors';

export class CategoryId {
  private constructor(public readonly value: string) {}

  static create(value?: string): CategoryId {
    return new CategoryId(value ?? randomUUID());
  }
}

export class CategoryCode {
  private static readonly CODE_REGEX = /^[A-Z0-9]+(_[A-Z0-9]+)*$/;

  private constructor(public readonly value: string) {}

  static create(value: string): CategoryCode {
    if (!this.CODE_REGEX.test(value)) {
      throw new InvalidCategoryCodeError(value);
    }

    return new CategoryCode(value);
  }
}

export interface CreateCategoryProps {
  id?: string;
  verticalId: string;
  parentCategoryId?: string | null;
  name: string;
  code: string;
  description: string;
  depth: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class Category {
  private constructor(
    private readonly id: CategoryId,
    private readonly verticalId: string,
    private parentCategoryId: string | null,
    private name: string,
    private code: CategoryCode,
    private description: string,
    private depth: number,
    private isActive: boolean,
    private readonly createdAt: Date,
    private updatedAt: Date | null
  ) {}

  static create(props: CreateCategoryProps): Category {
    const code = CategoryCode.create(props.code);

    return new Category(
      CategoryId.create(props.id),
      props.verticalId,
      props.parentCategoryId ?? null,
      props.name.trim(),
      code,
      props.description.trim(),
      props.depth,
      props.isActive ?? true,
      props.createdAt ?? new Date(),
      props.updatedAt ?? null
    );
  }

  getId(): CategoryId {
    return this.id;
  }

  getVerticalId(): string {
    return this.verticalId;
  }

  getParentCategoryId(): string | null {
    return this.parentCategoryId;
  }

  getName(): string {
    return this.name;
  }

  getCode(): string {
    return this.code.value;
  }

  getDescription(): string {
    return this.description;
  }

  getDepth(): number {
    return this.depth;
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

  updateDetails(
    name: string,
    code: string,
    description: string,
    parentCategoryId: string | null,
    depth: number
  ): void {
    this.name = name.trim();
    this.code = CategoryCode.create(code);
    this.description = description.trim();
    this.parentCategoryId = parentCategoryId;
    this.depth = depth;
    this.updatedAt = new Date();
  }

  inactivate(): void {
    if (!this.isActive) {
      throw new CategoryAlreadyInactiveError(this.id.value);
    }

    this.isActive = false;
    this.updatedAt = new Date();
  }

  activate(): void {
    if (this.isActive) {
      throw new CategoryAlreadyActiveError(this.id.value);
    }

    this.isActive = true;
    this.updatedAt = new Date();
  }
}
