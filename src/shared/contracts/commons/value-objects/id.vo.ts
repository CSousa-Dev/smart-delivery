import { randomUUID } from 'crypto';

export class Id {
  private constructor(private readonly value: string) {}

  static create(value?: string): Id {
    const v = value ?? randomUUID();
    return new Id(v);
  }

  toString(): string {
    return this.value;
  }

  equals(other: Id | string): boolean {
    return this.value === (typeof other === 'string' ? other : other.value);
  }

  get(): string {
    return this.value;
  }
}
