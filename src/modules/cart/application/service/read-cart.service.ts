import { CartRepository } from '../../domain/repository/cart.repository';
import { ReadCartInputDTO } from '../dtos/read-cart.input.dto';
import {
  CartReadOutputDTO,
  CartItemOutputDTO,
} from '../dtos/cart-read.output.dto';
import { CartItem } from '../../domain/entities/cart-item.entity';
import { CartNotFoundError } from '../errors/cart-not-found.error';
import { CartOwnerMismatchError } from '../errors/cart-owner-mismatch.error';

export class ReadCartService {
  constructor(private readonly cartRepository: CartRepository) {}

  public async execute(input: ReadCartInputDTO): Promise<CartReadOutputDTO> {
    const cart = await this.cartRepository.findById(input.cartId);
    if (!cart) {
      throw new CartNotFoundError(input.cartId);
    }
    if (cart.customerId !== input.actorUserId) {
      throw new CartOwnerMismatchError(input.actorUserId, cart.id.get());
    }

    return {
      id: cart.id.get(),
      status: cart.status,
      addressId: cart.addressId,
      fulfillmentPlanId: cart.deliveryPlanId,
      deliveryPrice: cart.deliveryPrice,
      paymentPreferenceId: cart.paymentPreferenceId,
      quoteId: cart.quoteId,
      paymentId: cart.paymentId,
      paymentMismatchReason: cart.paymentMismatchReason,
      items: cart.cartItems.map((item) => this.mapItem(item)),
      coupons: cart.coupons.map((coupon) => coupon.code),
      statusHistory: cart.statusHistory.map((entry) => ({
        status: entry.status,
        changedAt: entry.changedAt,
        ...(entry.durationMs !== undefined && { durationMs: entry.durationMs }),
      })),
    };
  }

  private mapItem(item: CartItem): CartItemOutputDTO {
    return {
      id: item.id.get(),
      productCatalogId: item.productCatalogId.get(),
      sku: item.sku,
      description: item.description,
      quantity: item.quantity,
      addons: item.addons.map((addon) => ({
        id: addon.id.get(),
        sku: addon.sku,
        ...(addon.additionalDescription !== undefined && { additionalDescription: addon.additionalDescription }),
        quantity: addon.quantity,
      })),
      removals: item.removals.map((removal) => ({
        sku: removal.sku,
      })),
      businessUnitId: item.businessUnitId,
      verticalId: item.verticalId,
      categories: item.categories,
    };
  }

}
