import { CategoryHierarchyService } from '../../../../src/modules/attributes/domain/services/category-hierarchy.service';
import {
  CategoryDepthExceededError,
  InvalidCategoryHierarchyError,
  ParentCategoryDifferentVerticalError,
} from '../../../../src/modules/attributes/domain/errors/category.errors';

describe('CategoryHierarchyService', () => {
  const service = new CategoryHierarchyService();

  it('should reject parent from different vertical', () => {
    expect(() =>
      service.validateParent(
        { id: 'parent-1', verticalId: 'vertical-1', parentCategoryId: null, depth: 1 },
        'vertical-2'
      )
    ).toThrow(ParentCategoryDifferentVerticalError);
  });

  it('should reject cycles', () => {
    expect(() =>
      service.validateHierarchy(
        { id: 'parent-1', verticalId: 'vertical-1', parentCategoryId: null, depth: 1 },
        [{ id: 'parent-1', verticalId: 'vertical-1', parentCategoryId: null, depth: 1 }]
      )
    ).toThrow(InvalidCategoryHierarchyError);
  });

  it('should reject depth over limit', () => {
    expect(() =>
      service.validateHierarchy(
        { id: 'parent-1', verticalId: 'vertical-1', parentCategoryId: null, depth: 5 },
        []
      )
    ).toThrow(CategoryDepthExceededError);
  });

  it('should return next depth when valid', () => {
    const depth = service.validateHierarchy(
      { id: 'parent-1', verticalId: 'vertical-1', parentCategoryId: null, depth: 1 },
      []
    );

    expect(depth).toBe(2);
  });

});
