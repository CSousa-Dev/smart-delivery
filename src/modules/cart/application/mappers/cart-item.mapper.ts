import { CartItem } from '../../domain/entities/cart-item.entity';
import { CartItemInputDTO } from '../dtos/cart-item.input.dto';
import { Id } from '../../../../shared/contracts/commons/value-objects/id.vo';
import { AddonDTO } from '../../../../shared/contracts/item/addon/addon.dto';
import { RemovalDTO } from '../../../../shared/contracts/item/removals/removal.dto';

export class CartItemMapper {
  public static fromInput(input: CartItemInputDTO): CartItem {
    return new CartItem(
      Id.create(input.id),
      Id.create(input.productCatalogId),
      input.sku,
      input.description,
      input.quantity ?? 1,
      (input.addons ?? []).map(
        (addon) =>
          new AddonDTO(
            Id.create(addon.id),
            addon.sku,
            addon.additionalDescription,
            addon.quantity ?? 1
          )
      ),
      (input.removals ?? []).map((removal) => new RemovalDTO(removal.sku)),
      input.businessUnitId,
      input.verticalId,
      input.categories ?? []
    );
  }
}
