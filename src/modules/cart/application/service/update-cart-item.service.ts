import { CartRepository } from '../../domain/repository/cart.repository';
import { CartItem } from '../../domain/entities/cart-item.entity';
import { UpdateCartItemInputDTO } from '../dtos/update-cart-item.input.dto';
import { CartItemInputDTO } from '../dtos/cart-item.input.dto';
import { Id } from '../../../../shared/contracts/commons/value-objects/id.vo';
import { AddonDTO } from '../../../../shared/contracts/item/addon/addon.dto';
import { RemovalDTO } from '../../../../shared/contracts/item/removals/removal.dto';
import { CartNotFoundError } from '../errors/cart-not-found.error';
import { ValidateCartItemService } from './validate-cart-item.service';
import { CartOwnerMismatchError } from '../errors/cart-owner-mismatch.error';

export class UpdateCartItemService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly validateCartItemService: ValidateCartItemService
  ) {}

  public async execute(input: UpdateCartItemInputDTO): Promise<void> {
    const cart = await this.getCartOrThrow(input.cartId);
    this.ensureOwner(cart.id.get(), cart.customerId, input.actorUserId);
    const item = this.toCartItem(input.item, true);

    await this.validateCartItemService.execute(item);

    cart.updateItem(item);
    await this.cartRepository.save(cart);
  }

  private async getCartOrThrow(cartId: string) {
    const cart = await this.cartRepository.findById(cartId);
    if (!cart) {
      throw new CartNotFoundError(cartId);
    }
    return cart;
  }

  private ensureOwner(cartId: string, customerId: string, actorUserId: string): void {
    if (customerId !== actorUserId) {
      throw new CartOwnerMismatchError(actorUserId, cartId);
    }
  }

  private toCartItem(input: CartItemInputDTO, requireId: boolean): CartItem {
    if (requireId && !input.id) {
      throw new Error('Item id is required.');
    }

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
