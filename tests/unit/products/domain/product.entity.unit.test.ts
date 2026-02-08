import { Product } from '../../../../src/modules/products/domain/entities/product.entity';
import {
  InvalidProductAttributesError,
  InvalidProductImagesError,
} from '../../../../src/modules/products/domain/errors/product.errors';

const baseProps = {
  organizationId: 'org-1',
  businessUnitId: 'bu-1',
  categoryId: 'cat-1',
  code: 'PROD_001',
  title: 'Produto Teste',
  shortDescription: 'Descricao curta valida',
  description: 'Descricao longa valida para o produto.',
  createdBy: 'user-1',
};

describe('Product Entity', () => {
  it('should create product-api with valid images', () => {
    const product = Product.create({
      ...baseProps,
      images: [
        { url: 'https://img/1.png', order: 1, isPrimary: true },
        { url: 'https://img/2.png', order: 2, isPrimary: false },
      ],
      attributes: [{ attributeId: 'attr-1', value: 'value' }],
    });

    expect(product.getImages()).toHaveLength(2);
    const primaryImage = product.getImages()[0];
    expect(primaryImage).toBeDefined();
    expect(primaryImage?.isPrimary).toBe(true);
  });

  it('should reject products without a primary image', () => {
    expect(() =>
      Product.create({
        ...baseProps,
        images: [
          { url: 'https://img/1.png', order: 1, isPrimary: false },
          { url: 'https://img/2.png', order: 2, isPrimary: false },
        ],
        attributes: [{ attributeId: 'attr-1', value: 'value' }],
      })
    ).toThrow(InvalidProductImagesError);
  });

  it('should reject products with more than 4 images', () => {
    expect(() =>
      Product.create({
        ...baseProps,
        images: [
          { url: 'https://img/1.png', order: 1, isPrimary: true },
          { url: 'https://img/2.png', order: 2, isPrimary: false },
          { url: 'https://img/3.png', order: 3, isPrimary: false },
          { url: 'https://img/4.png', order: 4, isPrimary: false },
          { url: 'https://img/5.png', order: 5, isPrimary: false },
        ],
        attributes: [{ attributeId: 'attr-1', value: 'value' }],
      })
    ).toThrow(InvalidProductImagesError);
  });

  it('should reject products with duplicated image order', () => {
    expect(() =>
      Product.create({
        ...baseProps,
        images: [
          { url: 'https://img/1.png', order: 1, isPrimary: true },
          { url: 'https://img/2.png', order: 1, isPrimary: false },
        ],
        attributes: [{ attributeId: 'attr-1', value: 'value' }],
      })
    ).toThrow(InvalidProductImagesError);
  });

  it('should reject products with invalid attribute values', () => {
    expect(() =>
      Product.create({
        ...baseProps,
        images: [{ url: 'https://img/1.png', order: 1, isPrimary: true }],
        attributes: [{ attributeId: '', value: '' }],
      })
    ).toThrow(InvalidProductAttributesError);
  });
});
