import {
  UnlinkProductFromItemInput,
  UnlinkProductFromItemOutput,
} from '../dtos/unlink-product-from-item.dto';
import { ProductItemLinkRepository } from '../../domain/repositories/product-item-link.repository';
import { InventoryItemRepository } from '../../domain/repositories/inventory-item.repository';
import { ProductRepository } from '../../domain/ports/product.repository';
import {
  BusinessUnitMismatchError,
  InventoryItemNotFoundError,
  LinkAlreadyInactiveError,
  ProductItemLinkNotFoundError,
  ProductNotFoundError,
} from '../../domain/errors/product-item-link.errors';
import { LinkStatus, ProductItemLink } from '../../domain/entities/product-item-link.entity';

export class UnlinkProductFromItemService {
  constructor(
    private readonly linkRepository: ProductItemLinkRepository,
    private readonly itemRepository: InventoryItemRepository,
    private readonly productRepository: ProductRepository
  ) {}

  async execute(input: UnlinkProductFromItemInput): Promise<UnlinkProductFromItemOutput> {
    const product = await this.productRepository.findById(input.productId);
    if (!product) {
      throw new ProductNotFoundError(input.productId);
    }

    const item = await this.itemRepository.findById(input.itemId);
    if (!item) {
      throw new InventoryItemNotFoundError(input.itemId);
    }

    if (product.businessUnitId !== input.businessUnitId || item.businessUnitId !== input.businessUnitId) {
      throw new BusinessUnitMismatchError(input.productId, input.itemId);
    }

    const link = await this.linkRepository.findByProductAndItem(
      input.productId,
      input.itemId,
      input.businessUnitId
    );
    if (!link) {
      throw new ProductItemLinkNotFoundError(input.productId, input.itemId);
    }

    if (link.getStatus() === LinkStatus.INACTIVE) {
      throw new LinkAlreadyInactiveError();
    }

    await this.linkRepository.updateStatus(
      link.getId().value,
      LinkStatus.INACTIVE,
      input.updatedBy
    );

    const updated = ProductItemLink.restore({
      id: link.getId().value,
      businessUnitId: link.getBusinessUnitId(),
      productId: link.getProductId(),
      itemId: link.getItemId(),
      status: LinkStatus.INACTIVE,
      createdBy: link.getCreatedBy(),
      createdAt: link.getCreatedAt(),
      updatedBy: input.updatedBy,
      updatedAt: new Date(),
    });

    return {
      id: updated.getId().value,
      businessUnitId: updated.getBusinessUnitId(),
      productId: updated.getProductId(),
      itemId: updated.getItemId(),
      status: updated.getStatus(),
      updatedBy: updated.getUpdatedBy(),
      updatedAt: updated.getUpdatedAt(),
    };
  }
}
