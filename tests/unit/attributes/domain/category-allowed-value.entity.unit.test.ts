import { CategoryAllowedValue } from '../../../../src/modules/attributes/domain/entities/category-allowed-value.entity';
import { InvalidAllowedValueValueError } from '../../../../src/modules/attributes/domain/errors/allowed-value.errors';

describe('CategoryAllowedValue Entity', () => {
  it('should create category allowed value', () => {
    const value = CategoryAllowedValue.create({
      categoryAttributeId: 'cat-attr-1',
      name: 'Grande',
      value: 'Large',
      minLength: 1,
      maxLength: 10,
    });

    expect(value.getId().value).toBeDefined();
    expect(value.getName()).toBe('Grande');
  });

  it('should reject invalid value format', () => {
    expect(() =>
      CategoryAllowedValue.create({
        categoryAttributeId: 'cat-attr-1',
        name: 'Grande',
        value: 'large',
        minLength: 1,
        maxLength: 10,
      })
    ).toThrow(InvalidAllowedValueValueError);
  });
});
