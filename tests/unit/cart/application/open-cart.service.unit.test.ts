import { OpenCartService } from '../../../../src/modules/cart/application/service/open-cart.service';
import { CartRepository } from '../../../../src/modules/cart/domain/repository/cart.repository';
import { CartEventPublisher } from '../../../../src/modules/cart/application/ports/cart-event.publisher';
import { InvalidBusinessContextError } from '../../../../src/modules/cart/domain/errors/invalid-business-context.error';
import { CartAlreadyOpenForCustomerError } from '../../../../src/modules/cart/domain/errors/cart-already-open-for-customer.error';
import { CustomerContextInvalidError } from '../../../../src/modules/cart/domain/errors/customer-context-invalid.error';
import { VerticalContextInvalidError } from '../../../../src/modules/cart/domain/errors/vertical-context-invalid.error';

describe('OpenCartService', () => {
  const validInput = {
    customerId: 'customer-1',
    verticalId: 'vertical-1',
    businessUnitId: 'business-unit-1',
    actorUserId: 'customer-1',
  };

  const buildService = () => {
    const cartRepository: CartRepository = {
      insertCartEnforcingOneActivePerCustomer: jest.fn().mockResolvedValue('cart-id-123'),
      findById: jest.fn(),
      save: jest.fn(),
      existsOpenCartForCustomer: jest.fn().mockResolvedValue(false),
      findOpenCartForCustomer: jest.fn().mockResolvedValue(null),
    };

    const eventPublisher: CartEventPublisher = {
      publish: jest.fn().mockResolvedValue(undefined),
    };

    const customerService = {
      existsInBusinessUnit: jest.fn().mockResolvedValue(true),
      validateCustomerAddressId: jest.fn(),
    };

    const organizationService = {
      isVerticalValidForBusinessUnit: jest.fn().mockResolvedValue(true),
    };

    return {
      service: new OpenCartService(
        cartRepository,
        eventPublisher,
        customerService,
        organizationService
      ),
      cartRepository,
      eventPublisher,
      customerService,
      organizationService,
    };
  };

  it('should throw CustomerContextInvalidError when customer context is invalid for BU', async () => {
    const { service, customerService } = buildService();
    (customerService.existsInBusinessUnit as jest.Mock).mockResolvedValue(false);

    await expect(service.execute(validInput)).rejects.toThrow(CustomerContextInvalidError);
  });

  it('should throw VerticalContextInvalidError when vertical context is invalid for BU', async () => {
    const { service, organizationService } = buildService();
    (organizationService.isVerticalValidForBusinessUnit as jest.Mock).mockResolvedValue(false);

    await expect(service.execute(validInput)).rejects.toThrow(VerticalContextInvalidError);
  });

  it('should return existing cartId when customer already has cart in flow', async () => {
    const { service, cartRepository } = buildService();
    const existingCart = { id: { get: () => 'cart-id-existing' } } as any;
    (cartRepository.findOpenCartForCustomer as jest.Mock).mockResolvedValue(existingCart);

    const output = await service.execute(validInput);
    expect(output.cartId).toBe('cart-id-existing');
    expect(cartRepository.insertCartEnforcingOneActivePerCustomer).not.toHaveBeenCalled();
  });

  it('should return existing cartId when repository throws due to unique_active_cart_per_customer constraint violation', async () => {
    const { service, cartRepository } = buildService();
    const constraintError = new CartAlreadyOpenForCustomerError(validInput.customerId);
    (cartRepository.insertCartEnforcingOneActivePerCustomer as jest.Mock).mockRejectedValue(
      constraintError
    );
    const existingCart = { id: { get: () => 'cart-id-existing' } } as any;
    (cartRepository.findOpenCartForCustomer as jest.Mock).mockResolvedValue(existingCart);

    const output = await service.execute(validInput);
    expect(output.cartId).toBe('cart-id-existing');
    expect(cartRepository.insertCartEnforcingOneActivePerCustomer).toHaveBeenCalledTimes(1);
  });

  it('should create cart and return cartId when input is valid', async () => {
    const { service, cartRepository, eventPublisher, customerService, organizationService } =
      buildService();

    const output = await service.execute(validInput);

    expect(customerService.existsInBusinessUnit).toHaveBeenCalledWith(
      validInput.customerId,
      validInput.businessUnitId
    );
    expect(organizationService.isVerticalValidForBusinessUnit).toHaveBeenCalledWith(
      validInput.verticalId,
      validInput.businessUnitId
    );
    expect(cartRepository.findOpenCartForCustomer).toHaveBeenCalledWith(validInput.customerId);
    expect(output.cartId).toBeDefined();
    expect(typeof output.cartId).toBe('string');
    expect(output.cartId.length).toBeGreaterThan(0);
    expect(cartRepository.insertCartEnforcingOneActivePerCustomer).toHaveBeenCalledTimes(1);
    expect(eventPublisher.publish).toHaveBeenCalledTimes(1);
    const publishedEvents = (eventPublisher.publish as jest.Mock).mock.calls[0][0];
    expect(publishedEvents).toHaveLength(1);
    expect(publishedEvents[0].name).toBe('CartCreated');
    expect(publishedEvents[0].cartId).toBe(output.cartId);
    expect(publishedEvents[0].customerId).toBe(validInput.customerId);
    expect(publishedEvents[0].verticalId).toBe(validInput.verticalId);
    expect(publishedEvents[0].businessUnitId).toBe(validInput.businessUnitId);
  });

  it('should throw InvalidBusinessContextError when customerId is missing', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        ...validInput,
        customerId: '',
      })
    ).rejects.toThrow(InvalidBusinessContextError);
  });

  it('should throw InvalidBusinessContextError when verticalId is missing', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        ...validInput,
        verticalId: '',
      })
    ).rejects.toThrow(InvalidBusinessContextError);
  });

  it('should throw InvalidBusinessContextError when businessUnitId is missing', async () => {
    const { service } = buildService();

    await expect(
      service.execute({
        ...validInput,
        businessUnitId: '',
      })
    ).rejects.toThrow(InvalidBusinessContextError);
  });

  it('should propagate repository errors', async () => {
    const { service, cartRepository } = buildService();
    const dbError = new Error('Database connection failed');
    (cartRepository.insertCartEnforcingOneActivePerCustomer as jest.Mock).mockRejectedValue(
      dbError
    );

    await expect(service.execute(validInput)).rejects.toThrow('Database connection failed');
  });

  it('should propagate event publisher errors', async () => {
    const { service, eventPublisher } = buildService();
    const publishError = new Error('Event bus unavailable');
    (eventPublisher.publish as jest.Mock).mockRejectedValue(publishError);

    await expect(service.execute(validInput)).rejects.toThrow('Event bus unavailable');
  });
});
