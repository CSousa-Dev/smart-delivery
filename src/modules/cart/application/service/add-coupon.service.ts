import { CartRepository } from '../../domain/repository/cart.repository';
import { AddCouponInputDTO } from '../dtos/add-coupon.input.dto';
import { CartStatusOutputDTO } from '../dtos/cart-status.output.dto';
import { CartNotFoundError } from '../errors/cart-not-found.error';
import { CartOwnerMismatchError } from '../errors/cart-owner-mismatch.error';
import { CartCoupon } from '../../domain/value-objects/cart-coupon.vo';
import { PricingService } from '../../domain/ports/pricing.service';
import { PricingCouponValidationMapper } from '../mappers/pricing-coupon-validation.mapper';

export class AddCouponService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly pricingService: PricingService
  ) {}

  public async execute(input: AddCouponInputDTO): Promise<CartStatusOutputDTO> {
    const cart = await this.cartRepository.findById(input.cartId);
    if (!cart) {
      throw new CartNotFoundError(input.cartId);
    }
    if (cart.customerId !== input.actorUserId) {
      throw new CartOwnerMismatchError(input.actorUserId, cart.id.get());
    }

    const coupon = this.toCoupon(input);
    await this.pricingService.validateCoupon(
      PricingCouponValidationMapper.toPayload(cart, coupon)
    );
    cart.addCoupon(coupon);
    await this.cartRepository.save(cart);

    return { cartId: cart.id.get(), status: cart.status };
  }

  private toCoupon(input: AddCouponInputDTO): CartCoupon {
    const code = input.coupon?.code ?? '';
    return new CartCoupon(code);
  }

}
