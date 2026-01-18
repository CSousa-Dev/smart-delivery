import { UnlinkProductFromItemService } from '../../../../src/modules/inventory/application/services/unlink-product-from-item.service';
import { ProductItemLinkRepository } from '../../../../src/modules/inventory/domain/repositories/product-item-link.repository';
import { InventoryItemRepository } from '../../../../src/modules/inventory/domain/repositories/inventory-item.repository';
import { ProductRepository } from '../../../../src/modules/inventory/domain/ports/product.repository';
import {
  LinkAlreadyInactiveError,
  ProductItemLinkNotFoundError,
  ProductNotFoundError,
} from '../../../../src/modules/inventory/domain/errors/product-item-link.errors';
import { ProductItemLink, LinkStatus } from '../../../../src/modules/inventory/domain/entities/product-item-link.entity';

describe('UnlinkProductFromItemService', () => {
  const buildService = (overrides?: Partial<{
    linkRepository: ProductItemLinkRepository;
    itemRepository: InventoryItemRepository;
    productRepository: ProductRepository;
  }>) => {
    const linkRepository: ProductItemLinkRepository = {
      findByProductId: jest.fn(),
      findByItemId: jest.fn(),
      findByProductAndItem: jest.fn().mockResolvedValue(
        ProductItemLink.create({
          businessUnitId: 'bu-1',
          productId: 'prod-1',
          itemId: 'item-1',
          createdBy: 'user-1',
          status: LinkStatus.ACTIVE,
        })
      ),
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
        requiresExpiration: false,
      }),
      save: jest.fn(),
      ...overrides?.itemRepository,
    };
    const productRepository: ProductRepository = {
      findById: jest.fn().mockResolvedValue({ id: 'prod-1', businessUnitId: 'bu-1' }),
      ...overrides?.productRepository,
    };

    return {
      service: new UnlinkProductFromItemService(linkRepository, itemRepository, productRepository),
      linkRepository,
    };
  };

  it('should reject when product does not exist', async () => {
    const { service } = buildService({
      productRepository: { findById: jest.fn().mockResolvedValue(null) },
    });

    await expect(
      service.execute({
        productId: 'prod-1',
        itemId: 'item-1',
        businessUnitId: 'bu-1',
        updatedBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(ProductNotFoundError);
  });

  it('should reject when link does not exist', async () => {
    const { service } = buildService({
      linkRepository: {
        findByProductId: jest.fn(),
        findByItemId: jest.fn(),
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
        updatedBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(ProductItemLinkNotFoundError);
  });

  it('should reject when link already inactive', async () => {
    const { service } = buildService({
      linkRepository: {
        findByProductId: jest.fn(),
        findByItemId: jest.fn(),
        findByProductAndItem: jest.fn().mockResolvedValue(
          ProductItemLink.create({
            businessUnitId: 'bu-1',
            productId: 'prod-1',
            itemId: 'item-1',
            createdBy: 'user-1',
            status: LinkStatus.INACTIVE,
          })
        ),
        save: jest.fn(),
        updateStatus: jest.fn(),
      },
    });

    await expect(
      service.execute({
        productId: 'prod-1',
        itemId: 'item-1',
        businessUnitId: 'bu-1',
        updatedBy: 'user-1',
      })
    ).rejects.toBeInstanceOf(LinkAlreadyInactiveError);
  });

  it('should deactivate link', async () => {
    const { service, linkRepository } = buildService();

    const output = await service.execute({
      productId: 'prod-1',
      itemId: 'item-1',
      businessUnitId: 'bu-1',
      updatedBy: 'user-1',
    });

    expect(linkRepository.updateStatus).toHaveBeenCalledTimes(1);
    expect(output.status).toBe('INACTIVE');
  });
});
