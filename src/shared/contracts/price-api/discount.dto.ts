export class DiscountDTO {
  constructor(
    public readonly code: string,
    public readonly price: number,
    public readonly description: string
  ) {}
}
