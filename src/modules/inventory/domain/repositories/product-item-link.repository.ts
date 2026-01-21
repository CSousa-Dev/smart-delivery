import { ProductItemLink } from '../entities/product-item-link.entity';

export interface ProductItemLinkRepository {
  findByProductId(productId: string, businessUnitId: string): Promise<ProductItemLink | null>;
  findByItemId(itemId: string, businessUnitId: string): Promise<ProductItemLink | null>;
  findByProductAndItem(
    productId: string,
    itemId: string,
    businessUnitId: string
  ): Promise<ProductItemLink | null>;
  save(link: ProductItemLink): Promise<void>;
  updateStatus(id: string, status: string, updatedBy: string): Promise<void>;
}
