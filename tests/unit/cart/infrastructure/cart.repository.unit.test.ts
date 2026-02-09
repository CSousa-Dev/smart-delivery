import { PrismaCartRepository } from '../../../../src/modules/cart/infrastructure/repositories/cart/cart.repository.impl';
import { Prisma } from '../../../../src/modules/cart/infrastructure/database/prisma/generated';
import { CartBuilder } from '../../../../src/modules/cart/domain/entities/cart.builder';
import { CartStatus } from '../../../../src/modules/cart/domain/entities/cart-status.enum';
import { CartAlreadyOpenForCustomerError } from '../../../../src/modules/cart/domain/errors/cart-already-open-for-customer.error';

describe('PrismaCartRepository', () => {
  describe('insertCartEnforcingOneActivePerCustomer', () => {
    it('should throw CartAlreadyOpenForCustomerError when unique_active_cart_per_customer constraint is violated (P2002)', async () => {
      const prisma = {
        cart: {
          create: jest.fn().mockRejectedValue(
            new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
              code: 'P2002',
              clientVersion: '5.x',
            })
          ),
          count: jest.fn().mockResolvedValue(0),
          findUnique: jest.fn(),
          update: jest.fn(),
        },
      } as any;

      const repo = new PrismaCartRepository(prisma);
      const cart = CartBuilder.openCart('customer-1', 'vertical-1', 'bu-1')
        .withStatus(CartStatus.OPEN)
        .build();

      await expect(repo.insertCartEnforcingOneActivePerCustomer(cart)).rejects.toThrow(
        CartAlreadyOpenForCustomerError
      );
      await expect(repo.insertCartEnforcingOneActivePerCustomer(cart)).rejects.toMatchObject({
        code: 'CART_ALREADY_OPEN_FOR_CUSTOMER',
      });
    });
  });
});
