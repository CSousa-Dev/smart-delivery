import {
  LinkProductToItemInput,
  LinkProductToItemOutput,
} from '../dtos/link-product-to-item.dto';
import { ProductItemLink, LinkStatus } from '../../domain/entities/product-item-link.entity';
import { ProductItemLinkRepository } from '../../domain/repositories/product-item-link.repository';
import { InventoryItemRepository } from '../../domain/repositories/inventory-item.repository';
import { ProductRepository } from '../../domain/ports/product.repository';
import {
  BusinessUnitMismatchError,
  InventoryItemNotFoundError,
  ItemAlreadyLinkedError,
  ProductAlreadyLinkedError,
  ProductNotFoundError,
} from '../../domain/errors/product-item-link.errors';

export class LinkProductToItemService {
  constructor(
    private readonly linkRepository: ProductItemLinkRepository,
    private readonly itemRepository: InventoryItemRepository,
    private readonly productRepository: ProductRepository
  ) {}

  async execute(input: LinkProductToItemInput): Promise<LinkProductToItemOutput> {
    const product = await this.productRepository.findById(input.productId);
    if (!product) {
      throw new ProductNotFoundError(input.productId);
    }

    const item = await this.itemRepository.findById(input.itemId);
    if (!item) {
      throw new InventoryItemNotFoundError(input.itemId);
    }

    if (product.businessUnitId !== item.businessUnitId) {
      throw new BusinessUnitMismatchError(input.productId, input.itemId);
    }

    if (product.businessUnitId !== input.businessUnitId) {
      throw new BusinessUnitMismatchError(input.productId, input.itemId);
    }

    const productLink = await this.linkRepository.findByProductId(
      input.productId,
      input.businessUnitId
    );
    if (productLink && productLink.getItemId() !== input.itemId) {
      throw new ProductAlreadyLinkedError(input.productId);
    }

    const itemLink = await this.linkRepository.findByItemId(
      input.itemId,
      input.businessUnitId
    );
    if (itemLink && itemLink.getProductId() !== input.productId) {
      throw new ItemAlreadyLinkedError(input.itemId);
    }

    const existing = await this.linkRepository.findByProductAndItem(
      input.productId,
      input.itemId,
      input.businessUnitId
    );

    if (existing) {
      if (existing.getStatus() === LinkStatus.ACTIVE) {
        return this.toOutput(existing);
      }
      await this.linkRepository.updateStatus(
        existing.getId().value,
        LinkStatus.ACTIVE,
        input.createdBy
      );

      const reactivated = ProductItemLink.restore({
        id: existing.getId().value,
        businessUnitId: existing.getBusinessUnitId(),
        productId: existing.getProductId(),
        itemId: existing.getItemId(),
        status: LinkStatus.ACTIVE,
        createdBy: existing.getCreatedBy(),
        createdAt: existing.getCreatedAt(),
        updatedBy: input.createdBy,
        updatedAt: new Date(),
      });

      return this.toOutput(reactivated);
    }

    const link = ProductItemLink.create({
      businessUnitId: input.businessUnitId,
      productId: input.productId,
      itemId: input.itemId,
      createdBy: input.createdBy,
    });

    await this.linkRepository.save(link);

    return this.toOutput(link);
  }

  private toOutput(link: ProductItemLink): LinkProductToItemOutput {
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
