import { DiscountDTO } from './discount.dto';

export class PriceDTO {
  constructor(
    public readonly sku: string,
    public readonly price: number,
    public readonly currency: string,
    public readonly totalDiscount: DiscountDTO,
    public readonly finalPrice: number,
    public readonly additional: PriceDTO[]
  ) {}
}
