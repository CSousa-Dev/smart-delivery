import { CategoryAttribute } from '../../../../src/modules/attributes/domain/entities/category-attribute.entity';
import { InvalidAttributeLimitsError, InvalidDefaultValueError } from '../../../../src/modules/attributes/domain/errors/attribute.errors';

describe('CategoryAttribute Entity', () => {
  it('should reject invalid limits', () => {
    expect(() =>
      CategoryAttribute.create({
        categoryId: 'category-1',
        attributeId: 'attribute-1',
        minValue: 10,
        maxValue: 5,
      })
    ).toThrow(InvalidAttributeLimitsError);
  });

  it('should reject default value without scope', () => {
    expect(() =>
      CategoryAttribute.create({
        categoryId: 'category-1',
        attributeId: 'attribute-1',
        defaultValueId: 'value-1',
      })
    ).toThrow(InvalidDefaultValueError);
  });

  it('should create category attribute', () => {
    const categoryAttribute = CategoryAttribute.create({
      categoryId: 'category-1',
      attributeId: 'attribute-1',
      isRequired: true,
    });

    expect(categoryAttribute.getId().value).toBeDefined();
  });
});
