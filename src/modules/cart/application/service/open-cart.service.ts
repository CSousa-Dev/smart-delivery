import { CartRepository } from '../../domain/repository/cart.repository';
import { CartBuilder } from '../../domain/entities/cart.builder';
import { CartStatus } from '../../domain/entities/cart-status.enum';
import { OpenCartInputDTO } from '../dtos/open-cart.input.dto';
import { OpenCartOutputDTO } from '../dtos/open-cart.output.dto';
import { CartEventPublisher } from '../ports/cart-event.publisher';
import { CartCreatedEvent } from '../../domain/events/cart-created.event';
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
    if (input.customerId !== input.actorUserId) {
      throw new CartOwnerMismatchError(input.actorUserId);
    }
    await this.validateCartContext(input);

    const existing = await this.cartRepository.findOpenCartForCustomer(input.customerId!);
    if (existing) {
      return { cartId: existing.id.get() };
    }

    const cart = CartBuilder.openCart(input.customerId, input.verticalId, input.businessUnitId)
      .withStatus(CartStatus.OPEN)
      .build();

    // May throw CartAlreadyOpenForCustomerError if unique_active_cart_per_customer constraint is violated (e.g. concurrent open).
    try {
      await this.cartRepository.insertCartEnforcingOneActivePerCustomer(cart);
    } catch (error) {
      if (error instanceof CartAlreadyOpenForCustomerError) {
        const concurrent = await this.cartRepository.findOpenCartForCustomer(input.customerId!);
        if (concurrent) {
          return { cartId: concurrent.id.get() };
        }
      }
      throw error;
    }
    const event = new CartCreatedEvent(
      cart.id.get(),
      cart.customerId,
      cart.verticalId,
      cart.businessUnitId,
      cart.status
    );
    await this.eventPublisher.publish([event]);
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
}
