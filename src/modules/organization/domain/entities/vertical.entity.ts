export class Vertical {
  private constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly code: string,
    private readonly description: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date | null
  ) {}

  static restore(props: {
    id: string;
    name: string;
    code: string;
    description: string;
    createdAt: Date;
    updatedAt?: Date | null;
  }): Vertical {
    return new Vertical(
      props.id,
      props.name,
      props.code,
      props.description,
      props.createdAt,
      props.updatedAt ?? null
    );
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getCode(): string {
    return this.code;
  }

  getDescription(): string {
    return this.description;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }
}
