import { CategoryController } from '../../../../src/modules/attributes/presentation/http/controllers/category.controller';
import { AppError } from '../../../../src/shared/utils/AppError';
import { InvalidCategoryCodeError } from '../../../../src/modules/attributes/domain/errors/category.errors';

describe('CategoryController', () => {
  const buildController = () => {
    const createCategoryService = {
      execute: jest.fn(),
    };
    const updateCategoryService = {
      execute: jest.fn(),
    };
    const inactivateCategoryService = {
      execute: jest.fn(),
    };
    const activateCategoryService = {
      execute: jest.fn(),
    };
    const getCategoryService = {
      execute: jest.fn(),
    };
    const listCategoriesService = {
      execute: jest.fn(),
    };

    return {
      controller: new CategoryController(
        createCategoryService as any,
        updateCategoryService as any,
        inactivateCategoryService as any,
        activateCategoryService as any,
        getCategoryService as any,
        listCategoriesService as any
      ),
      createCategoryService,
    };
  };

  it('should return 201 with payload', async () => {
    const { controller, createCategoryService } = buildController();
    (createCategoryService.execute as jest.Mock).mockResolvedValue({
      id: 'category-1',
      verticalId: 'vertical-1',
      parentCategoryId: null,
      name: 'Bebidas',
      code: 'BEVERAGES',
      description: 'Bebidas',
      depth: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: null,
    });

    const req = { body: { name: 'Bebidas' } } as any;
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
    const { controller, createCategoryService } = buildController();
    (createCategoryService.execute as jest.Mock).mockRejectedValue(
      new InvalidCategoryCodeError('invalid_code')
    );

    const req = { body: { name: 'Bebidas' } } as any;
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
    expect(error.code).toBe('INVALID_CATEGORY_CODE');
  });
});
