import { CartRepository } from '../../domain/repository/cart.repository';
import { RemoveCouponInputDTO } from '../dtos/remove-coupon.input.dto';
import { CartNotFoundError } from '../errors/cart-not-found.error';
import { CartOwnerMismatchError } from '../errors/cart-owner-mismatch.error';

export class RemoveCouponService {
  constructor(private readonly cartRepository: CartRepository) {}

  public async execute(input: RemoveCouponInputDTO): Promise<void> {
    const cart = await this.cartRepository.findById(input.cartId);
    if (!cart) {
      throw new CartNotFoundError(input.cartId);
    }
    if (cart.customerId !== input.actorUserId) {
      throw new CartOwnerMismatchError(input.actorUserId, cart.id.get());
    }

    cart.removeCoupon(input.couponCode);
    await this.cartRepository.save(cart);

    return;
  }
}
