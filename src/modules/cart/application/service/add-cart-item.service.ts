import { CartRepository } from '../../domain/repository/cart.repository';
import { AddCartItemInputDTO } from '../dtos/add-cart-item.input.dto';
import { CartEventPublisher } from '../ports/cart-event.publisher';
import { CartItemMapper } from '../mappers/cart-item.mapper';
import { CartNotFoundError } from '../errors/cart-not-found.error';
import { ValidateCartItemService } from './validate-cart-item.service';
import { CartItem } from '../../domain/entities/cart-item.entity';
import { CartOwnerMismatchError } from '../errors/cart-owner-mismatch.error';
import { Cart } from '../../domain/entities/cart.entity';

export class AddCartItemService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly eventPublisher: CartEventPublisher,
    private readonly validateCartItemService: ValidateCartItemService
  ) {}

  public async execute(input: AddCartItemInputDTO): Promise<{ itemId: string }> {
    const cart = await this.getCartOrThrow(input.cartId);
    this.ensureOwner(cart.id.get(), cart.customerId, input.actorUserId);
    const item = this.toCartItem(input);

    await this.validateCartItemService.execute(item);

    cart.addItem(item);
    await this.cartRepository.save(cart);
    await this.publishCartEvents(cart);
    return { itemId: item.id.get() };
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

  private toCartItem(input: AddCartItemInputDTO): CartItem {
    return CartItemMapper.fromInput(input.item);
  }

  private async publishCartEvents(cart: Cart): Promise<void> {
    const events = cart.pullDomainEvents();
    if (events.length > 0) {
      await this.eventPublisher.publish(events);
    }
  }
}
