import { Id } from '../../commons/value-objects/id.vo';

export class AddonDTO {
  constructor(
    public readonly id: Id,
    public readonly sku: string,
    public readonly additionalDescription?: string,
    public readonly quantity: number = 1
  ) {}
}
