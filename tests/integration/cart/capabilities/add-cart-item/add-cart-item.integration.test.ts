import { PrismaCartRepository } from '../../../../../src/modules/cart/infrastructure/repositories/cart/cart.repository.impl';
import { CartBuilder } from '../../../../../src/modules/cart/domain/entities/cart.builder';
import { AddCartItemService } from '../../../../../src/modules/cart/application/service/add-cart-item.service';
import { CartEventPublisherMock } from '../../../../../src/infrastructure/mocks/cart-event-publisher.mock';
import { createCartTestPrismaClient } from '../../../../helpers/prisma/cart/prisma-test-client';

const describeIf = process.env.DATABASE_URL_CART_TEST ? describe : describe.skip;

describeIf('Capability Add Cart Item – [CAP-CART-002]', () => {
  let prisma: any;

  beforeAll(() => {
    prisma = createCartTestPrismaClient() as any;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.cartStatusHistory.deleteMany();
    await prisma.cart.deleteMany();
  });

  it('should persist cart item and publish event – [SCN-001]', async () => {
    const cartRepository = new PrismaCartRepository(prisma);
    const eventPublisher = new CartEventPublisherMock();
    const validateCartItemService = { execute: jest.fn().mockResolvedValue(undefined) } as any;

    const cart = CartBuilder.openCart('customer-1', 'vertical-1', 'business-unit-1')
      .withCartId('cart-1')
      .build();
    await cartRepository.insertCartEnforcingOneActivePerCustomer(cart);

    const service = new AddCartItemService(cartRepository, eventPublisher, validateCartItemService);

    const output = await service.execute({
      cartId: 'cart-1',
      actorUserId: 'customer-1',
      item: {
        id: 'item-1',
        productCatalogId: 'product-1',
        sku: 'SKU-1',
        description: 'Product One',
        quantity: 2,
        businessUnitId: 'business-unit-1',
        verticalId: 'vertical-1',
        categories: ['cat-1'],
      },
    });

    expect(output.itemId).toBe('item-1');
    const persisted = await prisma.cart.findUnique({ where: { id: 'cart-1' } });
    expect(persisted).not.toBeNull();
    expect(Array.isArray(persisted?.items)).toBe(true);
    expect(persisted?.items?.[0]?.id).toBe('item-1');
    expect(eventPublisher.published).toHaveLength(1);
    expect(eventPublisher.published[0]?.name).toBe('CartItemAdded');
  });
});
