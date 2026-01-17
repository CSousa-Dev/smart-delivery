import { Product } from '../../../domain/entities/product.entity';

export class ProductMapper {
  static toPersistence(product: Product) {
    return {
      id: product.getId().value,
      organizationId: product.getOrganizationId(),
      businessUnitId: product.getBusinessUnitId(),
      categoryId: product.getCategoryId(),
      code: product.getCode(),
      codeNormalized: product.getCodeNormalized(),
      title: product.getTitle(),
      titleNormalized: product.getTitleNormalized(),
      shortDescription: product.getShortDescription(),
      description: product.getDescription(),
      createdBy: product.getCreatedBy(),
      createdAt: product.getCreatedAt(),
      updatedAt: product.getUpdatedAt(),
      images: {
        create: product.getImages().map((image) => ({
          url: image.url,
          displayOrder: image.order,
          altText: image.altText,
          isPrimary: image.isPrimary,
        })),
      },
      attributes: {
        create: product.getAttributes().map((attribute) => ({
          attributeId: attribute.attributeId,
          value: attribute.value,
        })),
      },
    };
  }
}
