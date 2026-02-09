import { CartRepository } from '../../domain/repository/cart.repository';
import { CartBuilder } from '../../domain/entities/cart.builder';
import { Cart } from '../../domain/entities/cart.entity';
import { OpenCartInputDTO } from '../dtos/open-cart.input.dto';
import { OpenCartOutputDTO } from '../dtos/open-cart.output.dto';
import { CartEventPublisher } from '../ports/cart-event.publisher';
import { CartAlreadyOpenForCustomerError } from '../../domain/errors/cart-already-open-for-customer.error';
import { CustomerService } from '../../domain/ports/customer.service';
import { OrganizationService } from '../../domain/ports/organization.service';
import { CustomerContextInvalidError } from '../../domain/errors/customer-context-invalid.error';
import { VerticalContextInvalidError } from '../../domain/errors/vertical-context-invalid.error';
import { BusinessContext } from '../../domain/value-objects/business-context.vo';
import { CartOwnerMismatchError } from '../errors/cart-owner-mismatch.error';

export class OpenCartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly eventPublisher: CartEventPublisher,
    private readonly customerService: CustomerService,
    private readonly organizationService: OrganizationService
  ) {}

  public async execute(input: OpenCartInputDTO): Promise<OpenCartOutputDTO> {
    new BusinessContext(input.customerId, input.verticalId, input.businessUnitId);

    if (input.customerId !== input.actorUserId) throw new CartOwnerMismatchError(input.actorUserId);

    const existingCartId = await this.findExistingCartAfterValidation(input);

    if (existingCartId) return { cartId: existingCartId };

    const cart = CartBuilder.openCart(
      input.customerId,
      input.verticalId,
      input.businessUnitId
    ).build();

    const concurrentCartId = await this.insertCartOrReturnConcurrentId(cart);

    if (concurrentCartId) return { cartId: concurrentCartId };
    await this.publishCartEvents(cart);
    return { cartId: cart.id.get() };
  }

  private async validateCartContext(input: OpenCartInputDTO): Promise<void> {
    const [belongsToBu, verticalValid] = await Promise.all([
      this.customerService.existsInBusinessUnit(input.customerId, input.businessUnitId),
      this.organizationService.isVerticalValidForBusinessUnit(
        input.verticalId,
        input.businessUnitId
      ),
    ]);

    if (!belongsToBu) {
      throw new CustomerContextInvalidError(input.customerId, input.businessUnitId);
    }

    if (!verticalValid) {
      throw new VerticalContextInvalidError(input.verticalId, input.businessUnitId);
    }
  }

  private async findExistingCartAfterValidation(input: OpenCartInputDTO): Promise<string | null> {
    const [, existing] = await Promise.all([
      this.validateCartContext(input),
      this.cartRepository.findOpenCartForCustomer(input.customerId!),
    ]);

    return existing?.id.get() ?? null;
  }

  private async insertCartOrReturnConcurrentId(cart: Cart): Promise<string | null> {
    // May throw CartAlreadyOpenForCustomerError if unique_active_cart_per_customer
    // constraint is violated (e.g. concurrent open).
    try {
      await this.cartRepository.insertCartEnforcingOneActivePerCustomer(cart);
      return null;
    } catch (error) {
      if (error instanceof CartAlreadyOpenForCustomerError) {
        const concurrent = await this.cartRepository.findOpenCartForCustomer(cart.customerId);
        if (concurrent) return concurrent.id.get();
      }
      throw error;
    }
  }

  private async publishCartEvents(cart: Cart): Promise<void> {
    const events = cart.pullDomainEvents();
    if (events.length > 0) {
      await this.eventPublisher.publish(events);
    }
  }
}
