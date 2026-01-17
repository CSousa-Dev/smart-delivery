import { randomUUID } from 'crypto';
import { InvalidCategoryCodeError } from '../errors/category.errors';

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
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class Category {
  private constructor(
    private readonly id: CategoryId,
    private readonly verticalId: string,
    private readonly parentCategoryId: string | null,
    private readonly name: string,
    private readonly code: CategoryCode,
    private readonly description: string,
    private readonly depth: number,
    private readonly createdAt: Date,
    private readonly updatedAt: Date | null
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

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }
}
