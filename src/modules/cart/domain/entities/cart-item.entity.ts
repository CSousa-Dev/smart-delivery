import { Id } from '../../../../shared/contracts/commons/value-objects/id.vo';
import { AddonDTO } from '../../../../shared/contracts/item/addon/addon.dto';
import { RemovalDTO } from '../../../../shared/contracts/item/removals/removal.dto';

export class CartItem {
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
