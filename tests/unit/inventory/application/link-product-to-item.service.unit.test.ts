import { LinkProductToItemService } from '../../../../src/modules/inventory/application/services/link-product-to-item.service';
import { ProductItemLinkRepository } from '../../../../src/modules/inventory/domain/repositories/product-item-link.repository';
import { InventoryItemRepository } from '../../../../src/modules/inventory/domain/repositories/inventory-item.repository';
import { ProductRepository } from '../../../../src/modules/inventory/domain/ports/product.repository';
import {
  BusinessUnitMismatchError,
  InventoryItemNotFoundError,
  ItemAlreadyLinkedError,
  ProductAlreadyLinkedError,
  ProductNotFoundError,
} from '../../../../src/modules/inventory/domain/errors/product-item-link.errors';
import { ProductItemLink, LinkStatus } from '../../../../src/modules/inventory/domain/entities/product-item-link.entity';

describe('LinkProductToItemService', () => {
  const buildService = (overrides?: Partial<{
    linkRepository: ProductItemLinkRepository;
    itemRepository: InventoryItemRepository;
    productRepository: ProductRepository;
  }>) => {
    const linkRepository: ProductItemLinkRepository = {
      findByProductId: jest.fn().mockResolvedValue(null),
      findByItemId: jest.fn().mockResolvedValue(null),
      findByProductAndItem: jest.fn().mockResolvedValue(null),
      save: jest.fn(),
      updateStatus: jest.fn(),
      ...overrides?.linkRepository,
    };
    const itemRepository: InventoryItemRepository = {
      existsByNameAndBusinessUnitId: jest.fn(),
      existsById: jest.fn(),
      findById: jest.fn().mockResolvedValue({
        id: 'item-1',
        businessUnitId: 'bu-1',
        unitOfMeasureId: 'uom-1',
        requiresExpiration: true,
      }),
      save: jest.fn(),
      ...overrides?.itemRepository,
    };
    const productRepository: ProductRepository = {
      findById: jest.fn().mockResolvedValue({ id: 'prod-1', businessUnitId: 'bu-1' }),
      ...overrides?.productRepository,
    };

    return {
      service: new LinkProductToItemService(linkRepository, itemRepository, productRepository),
      linkRepository,
      itemRepository,
      productRepository,
    };
  };

  it('should reject when product does not exist', async () => {
    const { service } = buildService({
      productRepository: {
        findById: jest.fn().mockResolvedValue(null),
      },
    });

    await expect(
      service.execute({
        productId: 'prod-1',
        itemId: 'item-1',
        businessUnitId: 'bu-1',
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(ProductNotFoundError);
  });

  it('should reject when item does not exist', async () => {
    const { service } = buildService({
      itemRepository: {
        existsByNameAndBusinessUnitId: jest.fn(),
        existsById: jest.fn(),
        findById: jest.fn().mockResolvedValue(null),
        save: jest.fn(),
      },
    });

    await expect(
      service.execute({
        productId: 'prod-1',
        itemId: 'item-1',
        businessUnitId: 'bu-1',
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(InventoryItemNotFoundError);
  });

  it('should reject when business unit mismatch', async () => {
    const { service } = buildService({
      productRepository: {
        findById: jest.fn().mockResolvedValue({ id: 'prod-1', businessUnitId: 'bu-2' }),
      },
    });

    await expect(
      service.execute({
        productId: 'prod-1',
        itemId: 'item-1',
        businessUnitId: 'bu-1',
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(BusinessUnitMismatchError);
  });

  it('should reject when product already linked to another item', async () => {
    const existing = ProductItemLink.create({
      businessUnitId: 'bu-1',
      productId: 'prod-1',
      itemId: 'item-2',
      createdBy: 'user-1',
      status: LinkStatus.ACTIVE,
    });
    const { service } = buildService({
      linkRepository: {
        findByProductId: jest.fn().mockResolvedValue(existing),
        findByItemId: jest.fn().mockResolvedValue(null),
        findByProductAndItem: jest.fn().mockResolvedValue(null),
        save: jest.fn(),
        updateStatus: jest.fn(),
      },
    });

    await expect(
      service.execute({
        productId: 'prod-1',
        itemId: 'item-1',
        businessUnitId: 'bu-1',
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(ProductAlreadyLinkedError);
  });

  it('should reject when item already linked to another product', async () => {
    const existing = ProductItemLink.create({
      businessUnitId: 'bu-1',
      productId: 'prod-2',
      itemId: 'item-1',
      createdBy: 'user-1',
      status: LinkStatus.ACTIVE,
    });
    const { service } = buildService({
      linkRepository: {
        findByProductId: jest.fn().mockResolvedValue(null),
        findByItemId: jest.fn().mockResolvedValue(existing),
        findByProductAndItem: jest.fn().mockResolvedValue(null),
        save: jest.fn(),
        updateStatus: jest.fn(),
      },
    });

    await expect(
      service.execute({
        productId: 'prod-1',
        itemId: 'item-1',
        businessUnitId: 'bu-1',
        createdBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(ItemAlreadyLinkedError);
  });

  it('should be idempotent when link already active', async () => {
    const existing = ProductItemLink.create({
      businessUnitId: 'bu-1',
      productId: 'prod-1',
      itemId: 'item-1',
      createdBy: 'user-1',
      status: LinkStatus.ACTIVE,
    });
    const { service, linkRepository } = buildService({
      linkRepository: {
        findByProductId: jest.fn().mockResolvedValue(existing),
        findByItemId: jest.fn().mockResolvedValue(existing),
        findByProductAndItem: jest.fn().mockResolvedValue(existing),
        save: jest.fn(),
        updateStatus: jest.fn(),
      },
    });

    const output = await service.execute({
      productId: 'prod-1',
      itemId: 'item-1',
      businessUnitId: 'bu-1',
      createdBy: 'user-1',
    });

    expect(linkRepository.updateStatus).not.toHaveBeenCalled();
    expect(linkRepository.save).not.toHaveBeenCalled();
    expect(output.status).toBe('ACTIVE');
  });

  it('should reactivate when link exists inactive', async () => {
    const existing = ProductItemLink.create({
      businessUnitId: 'bu-1',
      productId: 'prod-1',
      itemId: 'item-1',
      createdBy: 'user-1',
      status: LinkStatus.INACTIVE,
    });
    const { service, linkRepository } = buildService({
      linkRepository: {
        findByProductId: jest.fn().mockResolvedValue(existing),
        findByItemId: jest.fn().mockResolvedValue(existing),
        findByProductAndItem: jest.fn().mockResolvedValue(existing),
        save: jest.fn(),
        updateStatus: jest.fn(),
      },
    });

    const output = await service.execute({
      productId: 'prod-1',
      itemId: 'item-1',
      businessUnitId: 'bu-1',
      createdBy: 'user-2',
    });

    expect(linkRepository.updateStatus).toHaveBeenCalledTimes(1);
    expect(output.status).toBe('ACTIVE');
    expect(output.updatedBy).toBe('user-2');
    expect(output.updatedAt).toBeInstanceOf(Date);
  });
});
