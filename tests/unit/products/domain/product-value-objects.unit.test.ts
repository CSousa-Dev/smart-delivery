import {
  ProductCode,
  ProductDescription,
  ProductShortDescription,
  ProductTitle,
} from '../../../../src/modules/products/domain/entities/product.entity';
import {
  InvalidProductCodeError,
  InvalidProductDescriptionError,
  InvalidProductShortDescriptionError,
  InvalidProductTitleError,
} from '../../../../src/modules/products/domain/errors/product.errors';

describe('Product Value Objects', () => {
  it('should normalize product-api code and title', () => {
    const code = ProductCode.create('AbC_123');
    const title = ProductTitle.create('  My Product  ');

    expect(code.normalized).toBe('abc_123');
    expect(title.value).toBe('My Product');
    expect(title.normalized).toBe('my product');
  });

  it('should reject product-api code with invalid length', () => {
    expect(() => ProductCode.create('AB')).toThrow(InvalidProductCodeError);
    expect(() => ProductCode.create('A'.repeat(41))).toThrow(InvalidProductCodeError);
  });

  it('should reject product-api code with invalid characters or spaces', () => {
    expect(() => ProductCode.create('INVALID CODE')).toThrow(InvalidProductCodeError);
    expect(() => ProductCode.create('INVALID*CODE')).toThrow(InvalidProductCodeError);
  });

  it('should reject product-api title outside limits', () => {
    expect(() => ProductTitle.create('No')).toThrow(InvalidProductTitleError);
    expect(() => ProductTitle.create('A'.repeat(121))).toThrow(InvalidProductTitleError);
  });

  it('should reject product-api short description outside limits', () => {
    expect(() => ProductShortDescription.create('Too short')).toThrow(
      InvalidProductShortDescriptionError
    );
    expect(() => ProductShortDescription.create('A'.repeat(161))).toThrow(
      InvalidProductShortDescriptionError
    );
  });

  it('should reject product-api description outside limits', () => {
    expect(() => ProductDescription.create('Too short')).toThrow(InvalidProductDescriptionError);
    expect(() => ProductDescription.create('A'.repeat(2001))).toThrow(
      InvalidProductDescriptionError
    );
  });
});
