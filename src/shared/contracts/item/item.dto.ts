import { Id } from '../commons/value-objects/id.vo';
import { AddonDTO } from './addon/addon.dto';
import { RemovalDTO } from './removals/removal.dto';

export class ItemDTO {
  constructor(
    public readonly id: Id,
    public readonly productCatalogId: Id,
    public readonly sku: string,
    public readonly description: string,
    public readonly quantity: number = 1,
    public readonly addons: AddonDTO[],
    public readonly removals: RemovalDTO[],
    public readonly businessUnitId: string,
    public readonly verticalId: string,
    public readonly categories: string[]
  ) {}
}
