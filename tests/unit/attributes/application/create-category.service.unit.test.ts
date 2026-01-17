import { CreateCategoryService } from '../../../../src/modules/attributes/application/services/create-category.service';
import {
  CategoryCodeAlreadyExistsError,
  CategoryNameAlreadyExistsError,
  ParentCategoryNotFoundError,
  VerticalNotFoundError,
} from '../../../../src/modules/attributes/domain/errors/category.errors';
import { CategoryHierarchyService } from '../../../../src/modules/attributes/domain/services/category-hierarchy.service';
import { CategoryRepository } from '../../../../src/modules/attributes/domain/repositories/category.repository';
import { VerticalRepository } from '../../../../src/modules/attributes/domain/repositories/vertical.repository';

describe('CreateCategoryService', () => {
  const buildService = () => {
    const categoryRepository: CategoryRepository = {
      save: jest.fn(),
      existsByNameAndVerticalId: jest.fn().mockResolvedValue(false),
      existsByCodeAndVerticalId: jest.fn().mockResolvedValue(false),
      findById: jest.fn().mockResolvedValue(null),
      getAncestry: jest.fn().mockResolvedValue([]),
      getInheritanceChain: jest.fn().mockResolvedValue([]),
      validateChain: jest.fn(),
    };
    const verticalRepository: VerticalRepository = {
      save: jest.fn(),
      existsByName: jest.fn(),
      existsByCode: jest.fn(),
      existsById: jest.fn().mockResolvedValue(true),
    };
    const hierarchyService = new CategoryHierarchyService();

    return {
      service: new CreateCategoryService(
        categoryRepository,
        verticalRepository,
        hierarchyService
      ),
      categoryRepository,
      verticalRepository,
    };
  };

  it('should reject when vertical does not exist', async () => {
    const { service, verticalRepository } = buildService();
    (verticalRepository.existsById as jest.Mock).mockResolvedValue(false);

    await expect(
      service.execute({
        verticalId: 'vertical-1',
        name: 'Bebidas',
        code: 'BEVERAGES',
        description: 'Bebidas',
      })
    ).rejects.toBeInstanceOf(VerticalNotFoundError);
  });

  it('should reject duplicated name in vertical', async () => {
    const { service, categoryRepository } = buildService();
    (categoryRepository.existsByNameAndVerticalId as jest.Mock).mockResolvedValue(true);

    await expect(
      service.execute({
        verticalId: 'vertical-1',
        name: 'Bebidas',
        code: 'BEVERAGES',
        description: 'Bebidas',
      })
    ).rejects.toBeInstanceOf(CategoryNameAlreadyExistsError);
  });

  it('should reject duplicated code in vertical', async () => {
    const { service, categoryRepository } = buildService();
    (categoryRepository.existsByCodeAndVerticalId as jest.Mock).mockResolvedValue(true);

    await expect(
      service.execute({
        verticalId: 'vertical-1',
        name: 'Bebidas',
        code: 'BEVERAGES',
        description: 'Bebidas',
      })
    ).rejects.toBeInstanceOf(CategoryCodeAlreadyExistsError);
  });

  it('should reject when parent category does not exist', async () => {
    const { service, categoryRepository } = buildService();
    (categoryRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      service.execute({
        verticalId: 'vertical-1',
        parentCategoryId: 'parent-1',
        name: 'Refrigerantes',
        code: 'SODA',
        description: 'Refrigerantes',
      })
    ).rejects.toBeInstanceOf(ParentCategoryNotFoundError);
  });

  it('should create category', async () => {
    const { service } = buildService();

    const output = await service.execute({
      verticalId: 'vertical-1',
      name: 'Bebidas',
      code: 'BEVERAGES',
      description: 'Bebidas',
    });

    expect(output.id).toBeDefined();
    expect(output.depth).toBe(1);
  });
});
