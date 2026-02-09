import { CartRepository } from '../../domain/repository/cart.repository';
import { RemoveCartItemInputDTO } from '../dtos/remove-cart-item.input.dto';
import { CartNotFoundError } from '../errors/cart-not-found.error';
import { CartOwnerMismatchError } from '../errors/cart-owner-mismatch.error';
import { CartEventPublisher } from '../ports/cart-event.publisher';
import { Cart } from '../../domain/entities/cart.entity';

export class RemoveCartItemService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly eventPublisher: CartEventPublisher
  ) {}

  public async execute(input: RemoveCartItemInputDTO): Promise<void> {
    const cart = await this.cartRepository.findById(input.cartId);
    if (!cart) {
      throw new CartNotFoundError(input.cartId);
    }
    if (cart.customerId !== input.actorUserId) {
      throw new CartOwnerMismatchError(input.actorUserId, cart.id.get());
    }

    cart.removeItem(input.itemId);
    await this.cartRepository.save(cart);
    await this.publishCartEvents(cart);
  }

  private async publishCartEvents(cart: Cart): Promise<void> {
    const events = cart.pullDomainEvents();
    if (events.length > 0) {
      await this.eventPublisher.publish(events);
    }
  }
}
