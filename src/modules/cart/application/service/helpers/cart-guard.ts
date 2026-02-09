import { Cart } from '../../../domain/entities/cart.entity';
import { CartRepository } from '../../../domain/repository/cart.repository';
import { PaymentService } from '../../../domain/ports/payment.service';
import { CartNotFoundError } from '../../errors/cart-not-found.error';
import { CartOwnerMismatchError } from '../../errors/cart-owner-mismatch.error';

export async function loadCartById(
  cartRepository: CartRepository,
  cartId: string
): Promise<Cart> {
  const cart = await cartRepository.findById(cartId);
  if (!cart) {
    throw new CartNotFoundError(cartId);
  }
  return cart;
}

export function assertCartOwner(cart: Cart, actorUserId: string): void {
  if (cart.customerId !== actorUserId) {
    throw new CartOwnerMismatchError(actorUserId, cart.id.get());
  }
}

export async function loadCartForActor(
  cartRepository: CartRepository,
  cartId: string,
  actorUserId: string
): Promise<Cart> {
  const cart = await loadCartById(cartRepository, cartId);
  assertCartOwner(cart, actorUserId);
  return cart;
}

export async function clearQuoteIfExists(
  cart: Cart,
  paymentService: PaymentService
): Promise<void> {
  if (cart.quoteId) {
    await paymentService.deleteQuote(cart.quoteId);
    cart.clearQuote();
  }
}

