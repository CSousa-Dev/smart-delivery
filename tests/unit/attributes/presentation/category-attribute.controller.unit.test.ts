import { CategoryAttributeController } from '../../../../src/modules/attributes/presentation/http/controllers/category-attribute.controller';
import { AppError } from '../../../../src/shared/utils/AppError';
import { CategoryAttributeAlreadyExistsError } from '../../../../src/modules/attributes/domain/errors/category-attribute.errors';

describe('CategoryAttributeController', () => {
  const buildController = () => {
    const linkAttributeToCategoryService = {
      execute: jest.fn(),
    };

    return {
      controller: new CategoryAttributeController(linkAttributeToCategoryService as any),
      linkAttributeToCategoryService,
    };
  };

  it('should return 201 with payload', async () => {
    const { controller, linkAttributeToCategoryService } = buildController();
    (linkAttributeToCategoryService.execute as jest.Mock).mockResolvedValue({
      id: 'link-1',
      categoryId: 'category-1',
      attributeId: 'attribute-1',
      isRequired: null,
      isMultiValue: null,
      minValue: null,
      maxValue: null,
      defaultValueId: null,
      defaultValueScope: null,
      createdAt: new Date(),
    });

    const req = {
      params: { categoryId: 'category-1' },
      body: { attributeId: 'attribute-1' },
    } as any;
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
    const { controller, linkAttributeToCategoryService } = buildController();
    (linkAttributeToCategoryService.execute as jest.Mock).mockRejectedValue(
      new CategoryAttributeAlreadyExistsError('category-1', 'attribute-1')
    );

    const req = {
      params: { categoryId: 'category-1' },
      body: { attributeId: 'attribute-1' },
    } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await controller.create(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(409);
    expect(error.code).toBe('CATEGORY_ATTRIBUTE_EXISTS');
  });
});
