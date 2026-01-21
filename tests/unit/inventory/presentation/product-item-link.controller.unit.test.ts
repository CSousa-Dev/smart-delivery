import { ProductItemLinkController } from '../../../../src/modules/inventory/presentation/http/controllers/product-item-link.controller';
import { AppError } from '../../../../src/shared/utils/AppError';
import {
  ProductNotFoundError,
  ProductAlreadyLinkedError,
} from '../../../../src/modules/inventory/domain/errors/product-item-link.errors';

describe('ProductItemLinkController', () => {
  const buildController = () => {
    const linkProductToItemService = {
      execute: jest.fn(),
    };
    const unlinkProductFromItemService = {
      execute: jest.fn(),
    };

    return {
      controller: new ProductItemLinkController(
        linkProductToItemService as any,
        unlinkProductFromItemService as any
      ),
      linkProductToItemService,
      unlinkProductFromItemService,
    };
  };

  it('should return 201 with payload', async () => {
    const { controller, linkProductToItemService } = buildController();
    (linkProductToItemService.execute as jest.Mock).mockResolvedValue({
      id: 'link-1',
      businessUnitId: 'bu-1',
      productId: 'prod-1',
      itemId: 'item-1',
      status: 'ACTIVE',
      createdBy: 'user-1',
      createdAt: new Date(),
      updatedBy: null,
      updatedAt: null,
    });

    const req = { body: { productId: 'prod-1' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.create(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should map not found errors', async () => {
    const { controller, linkProductToItemService } = buildController();
    (linkProductToItemService.execute as jest.Mock).mockRejectedValue(
      new ProductNotFoundError('prod-1')
    );

    const req = { body: { productId: 'prod-1' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.create(req, res, next);

    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(404);
    expect(error.code).toBe('PRODUCT_NOT_FOUND');
  });

  it('should map conflict errors', async () => {
    const { controller, linkProductToItemService } = buildController();
    (linkProductToItemService.execute as jest.Mock).mockRejectedValue(
      new ProductAlreadyLinkedError('prod-1')
    );

    const req = { body: { productId: 'prod-1' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.create(req, res, next);

    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(409);
    expect(error.code).toBe('PRODUCT_ALREADY_LINKED');
  });

  it('should deactivate link', async () => {
    const { controller, unlinkProductFromItemService } = buildController();
    (unlinkProductFromItemService.execute as jest.Mock).mockResolvedValue({
      id: 'link-1',
      businessUnitId: 'bu-1',
      productId: 'prod-1',
      itemId: 'item-1',
      status: 'INACTIVE',
      updatedBy: 'user-1',
      updatedAt: new Date(),
    });

    const req = { body: { productId: 'prod-1', itemId: 'item-1' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.deactivate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
      })
    );
    expect(next).not.toHaveBeenCalled();
  });
});
