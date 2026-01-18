export type VerticalLinkStatusValue = 'ACTIVE' | 'INACTIVE';

export class VerticalLinkStatus {
  private constructor(public readonly value: VerticalLinkStatusValue) {}

  static create(value: VerticalLinkStatusValue): VerticalLinkStatus {
    return new VerticalLinkStatus(value);
  }
}
