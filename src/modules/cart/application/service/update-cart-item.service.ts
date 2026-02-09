import { CartRepository } from '../../domain/repository/cart.repository';
import { UpdateCartItemInputDTO } from '../dtos/update-cart-item.input.dto';
import { ValidateCartItemService } from './validate-cart-item.service';
import { loadCartForActor } from './helpers/cart-guard';
import { CartItemMapper } from '../mappers/cart-item.mapper';
import { CartItem } from '../../domain/entities/cart-item.entity';
import { Cart } from '../../domain/entities/cart.entity';
import { CartEventPublisher } from '../ports/cart-event.publisher';

export class UpdateCartItemService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly validateCartItemService: ValidateCartItemService,
    private readonly eventPublisher: CartEventPublisher
  ) {}

  public async execute(input: UpdateCartItemInputDTO): Promise<void> {
    const cart = await loadCartForActor(this.cartRepository, input.cartId, input.actorUserId);
    this.ensureItemId(input);
    const item = this.mapItem(input);
    await this.validateItem(item);
    await this.applyUpdate(cart, item);
  }

  private ensureItemId(input: UpdateCartItemInputDTO): void {
    if (!input.item?.id) {
      throw new Error('Item id is required.');
    }
  }

  private mapItem(input: UpdateCartItemInputDTO): CartItem {
    return CartItemMapper.fromInput(input.item);
  }

  private async validateItem(item: CartItem): Promise<void> {
    await this.validateCartItemService.execute(item);
  }

  private async applyUpdate(cart: Cart, item: CartItem): Promise<void> {
    cart.updateItem(item);
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
