import { ProductItemLink } from '../../../domain/entities/product-item-link.entity';

export class ProductItemLinkMapper {
  static toPersistence(link: ProductItemLink) {
    return {
      id: link.getId().value,
      businessUnitId: link.getBusinessUnitId(),
      productId: link.getProductId(),
      itemId: link.getItemId(),
      status: link.getStatus(),
      createdBy: link.getCreatedBy(),
      createdAt: link.getCreatedAt(),
      updatedBy: link.getUpdatedBy(),
      updatedAt: link.getUpdatedAt(),
    };
  }
}
