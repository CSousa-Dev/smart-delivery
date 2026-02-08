import { OpenCartService } from '../../../../../src/modules/cart/application/service/open-cart.service';
import { PrismaCartRepository } from '../../../../../src/modules/cart/infrastructure/repositories/cart/cart.repository.impl';
import { CartEventPublisherMock } from '../../../../../src/infrastructure/mocks/cart-event-publisher.mock';
import { CustomerServiceMock } from '../../../../../src/infrastructure/mocks/customer.service.mock';
import { OrganizationServiceMock } from '../../../../../src/infrastructure/mocks/organization.service.mock';
import { createCartTestPrismaClient } from '../../../../helpers/prisma/cart/prisma-test-client';
import { InvalidBusinessContextError } from '../../../../../src/modules/cart/domain/errors/invalid-business-context.error';

const describeIf = process.env.DATABASE_URL_CART_TEST ? describe : describe.skip;

describeIf('Capability Open Cart – [CAP-CART-001]', () => {
  let prisma: any;

  beforeAll(() => {
    prisma = createCartTestPrismaClient() as any;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.cart.deleteMany();
  });

  it('should create cart in DB and return cartId – [SCN-001]', async () => {
    const cartRepository = new PrismaCartRepository(prisma);
    const eventPublisher = new CartEventPublisherMock();
    const customerService = new CustomerServiceMock();
    const organizationService = new OrganizationServiceMock();
    const service = new OpenCartService(
      cartRepository,
      eventPublisher,
      customerService,
      organizationService
    );

    const output = await service.execute({
      customerId: 'customer-1',
      verticalId: 'vertical-1',
      businessUnitId: 'business-unit-1',
      actorUserId: 'customer-1',
    });

    expect(output.cartId).toBeDefined();
    const persisted = await prisma.cart.findUnique({
      where: { id: output.cartId },
    });
    expect(persisted).not.toBeNull();
    expect(persisted?.customerId).toBe('customer-1');
    expect(persisted?.verticalId).toBe('vertical-1');
    expect(persisted?.businessUnitId).toBe('business-unit-1');
    expect(persisted?.status).toBe('OPEN');
  });

  it('should reject when business context is invalid – [SCN-002]', async () => {
    const cartRepository = new PrismaCartRepository(prisma);
    const eventPublisher = new CartEventPublisherMock();
    const customerService = new CustomerServiceMock();
    const organizationService = new OrganizationServiceMock();
    const service = new OpenCartService(
      cartRepository,
      eventPublisher,
      customerService,
      organizationService
    );

    await expect(
      service.execute({
        customerId: '',
        verticalId: 'vertical-1',
        businessUnitId: 'business-unit-1',
        actorUserId: '',
      })
    ).rejects.toThrow(InvalidBusinessContextError);

    const count = await prisma.cart.count();
    expect(count).toBe(0);
  });

  it('should reject when customer already has cart in flow – [SCN-003]', async () => {
    const cartRepository = new PrismaCartRepository(prisma);
    const eventPublisher = new CartEventPublisherMock();
    const customerService = new CustomerServiceMock();
    const organizationService = new OrganizationServiceMock();
    const service = new OpenCartService(
      cartRepository,
      eventPublisher,
      customerService,
      organizationService
    );

    const first = await service.execute({
      customerId: 'customer-conflict',
      verticalId: 'vertical-1',
      businessUnitId: 'business-unit-1',
      actorUserId: 'customer-conflict',
    });

    const second = await service.execute({
      customerId: 'customer-conflict',
      verticalId: 'vertical-1',
      businessUnitId: 'business-unit-1',
      actorUserId: 'customer-conflict',
    });

    const count = await prisma.cart.count({ where: { customerId: 'customer-conflict' } });
    expect(count).toBe(1);
    expect(second.cartId).toBeDefined();
    expect(second.cartId).toBe(first.cartId);
  });
});
