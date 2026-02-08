import { CartController } from '../../../../src/modules/cart/presentation/http/controllers/cart.controller';
import { AppError } from '../../../../src/shared/utils/AppError';
import { InvalidBusinessContextError } from '../../../../src/modules/cart/domain/errors/invalid-business-context.error';
import { CartNotFoundError } from '../../../../src/modules/cart/application/errors/cart-not-found.error';
import { CartAlreadyOpenForCustomerError } from '../../../../src/modules/cart/domain/errors/cart-already-open-for-customer.error';
import { ImmutableCartViolationError } from '../../../../src/modules/cart/domain/errors/immutable-cart-violation.error';
import { CartStatus } from '../../../../src/modules/cart/domain/entities/cart-status.enum';

describe('CartController', () => {
  const validBody = {
    customerId: 'customer-1',
    verticalId: 'vertical-1',
    businessUnitId: 'business-unit-1',
  };

  const buildController = () => {
    const openCartService = {
      execute: jest.fn(),
    };
    const addCartItemService = {
      execute: jest.fn(),
    };
    const updateCartItemService = {
      execute: jest.fn(),
    };
    const removeCartItemService = {
      execute: jest.fn(),
    };
    const readCartService = {
      execute: jest.fn(),
    };
    const setCartAddressService = {
      execute: jest.fn(),
    };
    const setCartPaymentPreferenceService = {
      execute: jest.fn(),
    };
    const checkoutCartService = {
      execute: jest.fn(),
    };
    const startCartPaymentService = {
      execute: jest.fn(),
    };
    const processCartPaymentService = {
      execute: jest.fn(),
    };
    const reopenCartService = {
      execute: jest.fn(),
    };
    const addCouponService = {
      execute: jest.fn(),
    };
    const removeCouponService = {
      execute: jest.fn(),
    };
    const authenticateRequestService = {
      execute: jest.fn().mockResolvedValue({ userId: 'actor-1' }),
    };

    return {
      controller: new CartController(
        openCartService as any,
        addCartItemService as any,
        updateCartItemService as any,
        removeCartItemService as any,
        readCartService as any,
        setCartAddressService as any,
        setCartPaymentPreferenceService as any,
        checkoutCartService as any,
        startCartPaymentService as any,
        processCartPaymentService as any,
        reopenCartService as any,
        addCouponService as any,
        removeCouponService as any,
        authenticateRequestService as any
      ),
      openCartService,
      addCartItemService,
      updateCartItemService,
      removeCartItemService,
      readCartService,
      setCartAddressService,
      setCartPaymentPreferenceService,
      checkoutCartService,
      startCartPaymentService,
      processCartPaymentService,
      reopenCartService,
      addCouponService,
      removeCouponService,
      authenticateRequestService,
    };
  };

  it('should return 201 with cartId when open cart succeeds', async () => {
    const { controller, openCartService } = buildController();
    (openCartService.execute as jest.Mock).mockResolvedValue({ cartId: 'cart-uuid-123' });

    const req = { body: validBody } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.openCart(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: { cartId: 'cart-uuid-123' },
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should map InvalidBusinessContextError to 400 Bad Request', async () => {
    const { controller, openCartService } = buildController();
    (openCartService.execute as jest.Mock).mockRejectedValue(
      new InvalidBusinessContextError('CustomerId, verticalId and businessUnitId are required.')
    );

    const req = { body: validBody } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const next = jest.fn();

    await controller.openCart(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('INVALID_BUSINESS_CONTEXT');
  });

  it('should map CartAlreadyOpenForCustomerError to 409 Conflict', async () => {
    const { controller, openCartService } = buildController();
    (openCartService.execute as jest.Mock).mockRejectedValue(
      new CartAlreadyOpenForCustomerError('customer-1')
    );

    const req = { body: validBody } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const next = jest.fn();

    await controller.openCart(req, res, next);

    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(409);
    expect(error.code).toBe('CART_ALREADY_OPEN_FOR_CUSTOMER');
  });

  it('should map CartNotFoundError to 404 Not Found', async () => {
    const { controller, openCartService } = buildController();
    (openCartService.execute as jest.Mock).mockRejectedValue(new CartNotFoundError('cart-1'));

    const req = { body: validBody } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const next = jest.fn();

    await controller.openCart(req, res, next);

    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(404);
    expect(error.code).toBe('CART_NOT_FOUND');
  });

  it('should map ImmutableCartViolationError to 400 Bad Request', async () => {
    const { controller, openCartService } = buildController();
    (openCartService.execute as jest.Mock).mockRejectedValue(
      new ImmutableCartViolationError(CartStatus.ORDERED, 'Cannot add item')
    );

    const req = { body: validBody } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const next = jest.fn();

    await controller.openCart(req, res, next);

    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('IMMUTABLE_CART_VIOLATION');
  });

  it('should map unknown errors to 500 Internal', async () => {
    const { controller, openCartService } = buildController();
    (openCartService.execute as jest.Mock).mockRejectedValue(new Error('Unexpected failure'));

    const req = { body: validBody } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const next = jest.fn();

    await controller.openCart(req, res, next);

    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(500);
    expect(error.code).toBe('INTERNAL_ERROR');
  });
});
