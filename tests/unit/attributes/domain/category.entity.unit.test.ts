import { Category } from '../../../../src/modules/attributes/domain/entities/category.entity';
import { InvalidCategoryCodeError } from '../../../../src/modules/attributes/domain/errors/category.errors';

describe('Category Entity', () => {
  it('should trim name and description', () => {
    const category = Category.create({
      verticalId: 'vertical-1',
      parentCategoryId: null,
      name: '  Bebidas  ',
      code: 'BEVERAGES',
      description: '  Bebidas geladas  ',
      depth: 1,
    });

    expect(category.getName()).toBe('Bebidas');
    expect(category.getDescription()).toBe('Bebidas geladas');
  });

  it('should reject invalid code', () => {
    expect(() =>
      Category.create({
        verticalId: 'vertical-1',
        parentCategoryId: null,
        name: 'Bebidas',
        code: 'invalid',
        description: 'Bebidas',
        depth: 1,
      })
    ).toThrow(InvalidCategoryCodeError);
  });
});
