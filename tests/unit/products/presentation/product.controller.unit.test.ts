import { ProductController } from '../../../../src/modules/products/presentation/http/controllers/product.controller';
import { AppError } from '../../../../src/shared/utils/AppError';
import {
  InvalidProductCodeError,
  UserNotOwnerError,
} from '../../../../src/modules/products/domain/errors/product.errors';

describe('ProductController', () => {
  const buildController = () => {
    const createProductService = {
      execute: jest.fn(),
    };

    return {
      controller: new ProductController(createProductService as any),
      createProductService,
    };
  };

  it('should return 201 with payload', async () => {
    const { controller, createProductService } = buildController();
    (createProductService.execute as jest.Mock).mockResolvedValue({
      id: 'prod-1',
      organizationId: 'org-1',
      businessUnitId: 'bu-1',
      categoryId: 'cat-1',
      code: 'PROD_1',
      title: 'Produto 1',
      shortDescription: 'Descricao curta valida',
      description: 'Descricao detalhada valida para o produto.',
      images: [{ url: 'https://img/1.png', order: 1, altText: null, isPrimary: true }],
      attributes: [{ attributeId: 'attr-1', value: 'value-1' }],
      createdBy: 'user-1',
      createdAt: new Date(),
      updatedAt: null,
    });

    const req = { body: { code: 'PROD_1' } } as any;
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

  it('should map domain errors to AppError', async () => {
    const { controller, createProductService } = buildController();
    (createProductService.execute as jest.Mock).mockRejectedValue(
      new InvalidProductCodeError('invalid')
    );

    const req = { body: { code: 'invalid' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.create(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('INVALID_PRODUCT_CODE');
  });

  it('should map owner errors to forbidden', async () => {
    const { controller, createProductService } = buildController();
    (createProductService.execute as jest.Mock).mockRejectedValue(
      new UserNotOwnerError('user-2', 'org-1')
    );

    const req = { body: { code: 'PROD_1' } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.create(req, res, next);

    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(403);
    expect(error.code).toBe('USER_NOT_OWNER');
  });
});
